import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

/**
 * model Message {
  id         String   @id @default(auto()) @map("_id") @db.ObjectId
  content    String
  createdAt  DateTime @default(now())
  sender     User     @relation(name: "SentMessages", fields: [senderId], references: [id])
  senderId   String   @db.ObjectId
  receiver   User     @relation(name: "ReceivedMessages", fields: [receiverId], references: [id])
  receiverId String   @db.ObjectId
  chat       Chat     @relation(fields: [chatId], references: [id])
  chatId     String   @db.ObjectId

  @@index([senderId], name: "senderId")
  @@index([receiverId], name: "receiverId")
  @@index([chatId], name: "chatId")
}
 */

export class CreateMessageDto {
  @IsNotEmpty()
  @ApiProperty()
  @MaxLength(120)
  content: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  senderId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  receiverId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  chatId: string;
}
