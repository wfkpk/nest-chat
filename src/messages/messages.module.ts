import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
