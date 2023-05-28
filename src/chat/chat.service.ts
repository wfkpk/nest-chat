import { EncryptionService } from './../encryption/encryption.service';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly encryptionService: EncryptionService,
  ) {}

  async createChat(userId: string, senderId: string) {
    const chat = await this.prisma.chat.create({
      data: {
        participantA: { connect: { id: userId } },
        participantB: { connect: { id: senderId } },
      },
    });
    return chat;
  }

  async getAllChat(userId: string) {
    const chats = await this.prisma.chat.findMany({
      where: {
        AND: [{ participantAId: userId }, { participantBId: userId }],
      },
      include: {
        messages: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
          select: {
            id: true,
            content: true,
            createdAt: true,
            senderId: true,
            receiverId: true,
          },
        },
        participantA: {
          select: {
            id: true,
            username: true,
          },
        },
        participantB: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    return chats;
  }
}
