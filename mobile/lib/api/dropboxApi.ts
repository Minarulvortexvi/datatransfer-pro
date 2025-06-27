import { Dropbox } from 'dropbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getDropboxClient = async () => {
  const accessToken = await AsyncStorage.getItem('dropboxAccessToken');
  if (!accessToken) throw new Error('No Dropbox access token');
  return new Dropbox({ accessToken });
};

async function retryRequest<T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      if (error.status === 429 && i < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay * Math.pow(2, i)));
        continue;
      }
      throw error;
    }
  }
  throw new Error('Max retries reached');
}

export const uploadToDropbox = async (fileUri: string, fileName: string, path: string) => {
  const dbx = await getDropboxClient();
  const file = await fetch(fileUri).then((res) => res.blob());
  return retryRequest(async () => {
    const response = await dbx.filesUpload({
      path: `/${path}/${fileName}`,
      contents: file,
      mode: { '.tag': 'add' },
    });
    return response.result;
  });
};

export const downloadFromDropbox = async (path: string) => {
  const dbx = await getDropboxClient();
  return retryRequest(async () => {
    const response = await dbx.filesDownload({ path });
    return response.result;
  });
};

export const getSharedLink = async (path: string) => {
  const dbx = await getDropboxClient();
  return retryRequest(async () => {
    const response = await dbx.sharingCreateSharedLinkWithSettings({
      path,
      settings: { requested_visibility: { '.tag': 'public' } },
    });
    return response.result.url;
  });
};
