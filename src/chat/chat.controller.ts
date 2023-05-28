import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('/all')
  async getAllChat(@Query() userId: string) {
    return this.chatService.getAllChat(userId);
  }

  @Post('/create')
  async createChat(@Body() createChatDto: CreateChatDto) {
    return this.chatService.createChat(
      createChatDto.userId,
      createChatDto.senderId,
    );
  }
}
