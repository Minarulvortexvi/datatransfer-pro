import { Injectable } from '@nestjs/common';
import { TransferRepository } from './transfer.repository';
import { DropboxUtil } from '../shared/utils/dropbox.util';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TransferService {
  constructor(
    private readonly transferRepository: TransferRepository,
    private readonly dropboxUtil: DropboxUtil,
    private readonly configService: ConfigService,
  ) {}

  async initiateTransfer(userId: string, provider: string, accessToken: string, file: Buffer, fileName: string) {
    const transfer = await this.transferRepository.create({
      userId,
      provider,
      status: 'pending',
      createdAt: new Date(),
      size: file.length,
      filePath: `transfers/${Date.now()}/${fileName}`,
    });

    if (provider === 'dropbox') {
      await this.dropboxUtil.uploadFile(accessToken, file, transfer.filePath);
      const sharedLink = await this.dropboxUtil.getSharedLink(accessToken, `/${transfer.filePath}`);
      await this.transferRepository.update(transfer._id, { sharedLink, status: 'completed' });
      return { transferId: transfer._id, sharedLink };
    }

    return { transferId: transfer._id };
  }

  async getTransferData(transferId: string) {
    const transfer = await this.transferRepository.findById(transferId);
    if (!transfer) {
      throw new Error('Transfer not found');
    }
    return { status: transfer.status, sharedLink: transfer.sharedLink, filePath: transfer.filePath };
  }
}
