import { MessagesService } from './messages.service';
import { Controller, Get, Query } from '@nestjs/common';

@Controller()
export class MessagesController {
  constructor(private readonly messageService: MessagesService) {}

  @Get()
  async getAllMessages(@Query('chatId') chatId: string) {
    return this.messageService.getAllMessages(chatId);
  }
}
