import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transfer, TransferDocument } from './transfer.schema';

@Injectable()
export class TransferRepository {
  constructor(@InjectModel(Transfer.name) private transferModel: Model<TransferDocument>) {}

  async create(transfer: Partial<Transfer>): Promise<TransferDocument> {
    return this.transferModel.create(transfer);
  }

  async findById(id: string): Promise<TransferDocument | null> {
    return this.transferModel.findById(id).exec();
  }

  async update(id: string, update: Partial<Transfer>): Promise<TransferDocument | null> {
    return this.transferModel.findByIdAndUpdate(id, update, { new: true }).exec();
  }
}
