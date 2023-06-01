import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EncryptionService } from 'src/encryption/encryption.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { Message } from '@prisma/client';
import { CreateMessageDto } from './dto/create-message.dto';
@Injectable()
export class ChatService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly encryptionService: EncryptionService,
  ) {}

  async createChat(createChatDto: CreateChatDto): Promise<string> {
    // Create a new chat in the database and return its ID
    const { senderId, userId } = createChatDto;
    const { id } = await this.prisma.chat.create({
      data: {
        participantA: { connect: { id: senderId } },
        participantB: { connect: { id: userId } },
      },
    });
    await this.encryptionService.generateKeyPair(id);
    return id;
  }

  async sendMessage(message: CreateMessageDto): Promise<void> {
    // Encrypt the message using the chat's public key
    const { chatId, senderId, receiverId, content } = message;
    const encryptedMessage = await this.encryptionService.encrypt(
      chatId,
      content,
    );

    console.log(encryptedMessage);

    // Add the encrypted message to the chat's messages
    await this.prisma.message.create({
      data: {
        content: encryptedMessage,
        sender: { connect: { id: senderId } },
        receiver: { connect: { id: receiverId } },
        chat: { connect: { id: chatId } },
      },
    });
  }

  async getMessages(chatId: string): Promise<Message[]> {
    // Retrieve the messages for the given chat ID
    const messages = await this.prisma.message.findMany({
      where: { chatId },
      include: { sender: true, receiver: true },
      orderBy: { createdAt: 'asc' },
    });

    // Decrypt the messages and create a new array with decrypted content
    const decryptedMessages: Message[] = await Promise.all(
      messages.map(async (message) => {
        const decryptedContent = await this.encryptionService.decrypt(
          chatId,
          message.content,
        );
        return { ...message, content: decryptedContent };
      }),
    );

    // Return the decrypted messages
    return decryptedMessages;
  }
}
