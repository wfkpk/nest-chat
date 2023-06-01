import { PrismaService } from 'src/prisma/prisma.service';
import { EncryptionService } from './../encryption/encryption.service';

import { Injectable } from '@nestjs/common';
@Injectable()
export class MessagesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly encryptionService: EncryptionService,
  ) {}
}
