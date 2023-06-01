import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from '../chat/chat.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessagesModule } from 'src/messages/messages.module';

@Module({
  imports: [ChatModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
