import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
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
