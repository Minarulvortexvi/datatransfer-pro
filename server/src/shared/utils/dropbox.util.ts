import { Dropbox } from 'dropbox';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DropboxUtil {
  constructor(private configService: ConfigService) {}

  getClient(accessToken: string) {
    return new Dropbox({
      accessToken,
      clientId: this.configService.get('DROPBOX_CLIENT_ID'),
      clientSecret: this.configService.get('DROPBOX_CLIENT_SECRET'),
    });
  }

  async uploadFile(accessToken: string, file: Buffer, path: string) {
    const dbx = this.getClient(accessToken);
    try {
      const response = await dbx.filesUpload({
        path: `/${path}`,
        contents: file,
        mode: { '.tag': 'add' },
      });
      return response.result;
    } catch (error) {
      throw new Error(`Dropbox upload failed: ${error.message}`);
    }
  }

  async downloadFile(accessToken: string, path: string) {
    const dbx = this.getClient(accessToken);
    try {
      const response = await dbx.filesDownload({ path });
      return response.result;
    } catch (error) {
      throw new Error(`Dropbox download failed: ${error.message}`);
    }
  }

  async getSharedLink(accessToken: string, path: string) {
    const dbx = this.getClient(accessToken);
    try {
      const response = await dbx.sharingCreateSharedLinkWithSettings({
        path,
        settings: { requested_visibility: { '.tag': 'public' } },
      });
      return response.result.url;
    } catch (error) {
      throw new Error(`Dropbox shared link creation failed: ${error.message}`);
    }
  }
}
