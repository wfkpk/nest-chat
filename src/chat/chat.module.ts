import { EncryptionService } from './../encryption/encryption.service';
import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatController } from './chat.controller';
@Module({
  imports: [],
  controllers: [ChatController],
  providers: [ChatService, PrismaService, EncryptionService],
})
export class ChatModule {}
