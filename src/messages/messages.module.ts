import { EncryptionService } from './../encryption/encryption.service';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [MessagesController],
  providers: [MessagesService, PrismaService, EncryptionService],
})
export class MessagesModule {}
