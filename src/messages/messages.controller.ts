import { MessagesService } from './messages.service';
import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
@Controller('message')
export class MessagesController {
  constructor(private readonly messageService: MessagesService) {}
}
