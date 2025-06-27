import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Transfer {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  provider: string;

  @Prop({ default: 'pending' })
  status: string;

  @Prop()
  sharedLink: string;

  @Prop()
  filePath: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  size: number;
}

export type TransferDocument = Transfer & Document;
export const TransferSchema = SchemaFactory.createForClass(Transfer);
