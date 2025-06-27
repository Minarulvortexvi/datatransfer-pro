import { Controller, Post, Body, Get, Param, UseGuards, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { AuthGuard } from '../auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Post('start')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async initiate(@Body() body: { userId: string; provider: string }, @UploadedFile() file: Express.Multer.File, @Req() req) {
    const { userId, provider } = body;
    const accessToken = req.user.accessToken;
    return this.transferService.initiateTransfer(userId, provider, accessToken, file.buffer, file.originalname);
  }

  @Get('status/:transferId')
  async getStatus(@Param('transferId') transferId: string) {
    return this.transferService.getTransferData(transferId);
  }
}
