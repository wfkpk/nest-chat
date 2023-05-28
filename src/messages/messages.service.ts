import { PrismaService } from 'src/prisma/prisma.service';
import { EncryptionService } from './../encryption/encryption.service';

import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly encryptionService: EncryptionService,
  ) {}

  async createNewMessage(
    content: string,
    userId: string,
    senderId: string,
    chatId,
  ) {
    const encryptedContent = this.encryptionService.encrypt(content, chatId);
    return this.prisma.message.create({
      data: {
        content: encryptedContent,
        sender: { connect: { id: userId } },
        receiver: { connect: { id: senderId } },
        chat: { connect: { id: chatId } },
      },
    });
  }

  async getAllMessages(chatId: string) {
    const messages = await this.prisma.message.findMany({
      where: { chatId },
      include: {
        sender: true,
        receiver: true,
      },
    });
    messages.map((message) => {
      this.encryptionService.decrypt(message.content, chatId);
    });

    return messages;
  }
}
