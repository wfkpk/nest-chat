import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async createChat(@Body() createChatDto: CreateChatDto): Promise<void> {
    const chatId = await this.chatService.createChat(createChatDto);
  }

  @Post('/messages')
  async sendMessage(@Body() message: CreateMessageDto): Promise<void> {
    await this.chatService.sendMessage(message);
  }

  @Get(':chatId/messages')
  async getMessages(@Param('chatId') chatId: string) {
    const messages = await this.chatService.getMessages(chatId);

    return messages;
  }
}
