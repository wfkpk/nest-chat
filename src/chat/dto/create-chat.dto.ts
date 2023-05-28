import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * model Chat {
  id             String    @id @default(auto()) @map("_id") @db.ObjectId
  createdAt      DateTime  @default(now())
  participantA   User      @relation("ParticipantA", fields: [participantAId], references: [id])
  participantAId String    @db.ObjectId
  participantB   User      @relation("ParticipantB", fields: [participantBId], references: [id])
  participantBId String    @db.ObjectId
  messages       Message[] // Messages associated with the chat

  @@index([participantAId], name: "participantAId")
  @@index([participantBId], name: "participantBId")
}
 */
export class CreateChatDto {
  @ApiProperty()
  @IsString()
  senderId: string;

  @ApiProperty()
  @IsString()
  userId: string;
}
