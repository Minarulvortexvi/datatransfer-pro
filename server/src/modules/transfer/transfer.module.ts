import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransferController } from './transfer.controller';
import { TransferService } from './transfer.service';
import { Transfer, TransferSchema } from './transfer.schema';
import { TransferRepository } from './transfer.repository';
import { DropboxUtil } from '../shared/utils/dropbox.util';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Transfer.name, schema: TransferSchema }]), AuthModule],
  controllers: [TransferController],
  providers: [TransferService, TransferRepository, DropboxUtil],
})
export class TransferModule {}
