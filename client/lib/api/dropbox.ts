import { Dropbox } from 'dropbox';

export const getDropboxClient = (accessToken: string) => {
  return new Dropbox({
    accessToken,
    clientId: process.env.NEXT_PUBLIC_DROPBOX_CLIENT_ID,
  });
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

export const uploadToDropbox = async (accessToken: string, file: File, path: string) => {
  const dbx = getDropboxClient(accessToken);
  return retryRequest(async () => {
    const response = await dbx.filesUpload({
      path: `/${path}/${file.name}`,
      contents: file,
      mode: { '.tag': 'add' },
    });
    return response.result;
  });
};

export const downloadFromDropbox = async (accessToken: string, path: string) => {
  const dbx = getDropboxClient(accessToken);
  return retryRequest(async () => {
    const response = await dbx.filesDownload({ path });
    return response.result;
  });
};

export const getSharedLink = async (accessToken: string, path: string) => {
  const dbx = getDropboxClient(accessToken);
  return retryRequest(async () => {
    const response = await dbx.sharingCreateSharedLinkWithSettings({
      path,
      settings: { requested_visibility: { '.tag': 'public' } },
    });
    return response.result.url;
  });
};
