import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from '../chat/chat.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [ChatModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
