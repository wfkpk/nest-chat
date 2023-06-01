import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateKeyPairSync, privateDecrypt, publicEncrypt } from 'crypto';

@Injectable()
export class EncryptionService {
  constructor(private prisma: PrismaService) {}

  // Generates a new key pair for a chat ID
  async generateKeyPair(chatId: string): Promise<void> {
    const { publicKey, privateKey } = generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
      },
    });

    await this.prisma.keyPair.create({
      data: {
        publicKey,
        privateKey,
        chat: {
          connect: { id: chatId },
        },
      },
    });
  }

  // Retrieves the key pair for a chat ID
  async getKeyPair(
    chatId: string,
  ): Promise<{ publicKey: string; privateKey: string }> {
    const keyPair = await this.prisma.keyPair.findUnique({
      where: { chatId },
      include: { chat: true },
    });
    if (!keyPair) {
      throw new Error(`No key pair found for chat ID: ${chatId}`);
    }

    return { publicKey: keyPair.publicKey, privateKey: keyPair.privateKey };
  }

  // Encrypts a message using the public key associated with a chat ID
  async encrypt(chatId: string, message: string): Promise<string> {
    const { publicKey } = await this.getKeyPair(chatId);
    const encryptedBuffer = publicEncrypt(
      publicKey,
      Buffer.from(message, 'utf8'),
    );
    return encryptedBuffer.toString('base64');
  }

  // Decrypts an encrypted message using the private key associated with a chat ID
  async decrypt(chatId: string, encryptedMessage: string): Promise<string> {
    const { privateKey } = await this.getKeyPair(chatId);
    const encryptedBuffer = Buffer.from(encryptedMessage, 'base64');
    const decryptedBuffer = privateDecrypt(
      { key: privateKey, passphrase: '' },
      encryptedBuffer,
    );
    console.log(decryptedBuffer.toString('utf-8'));
    return decryptedBuffer.toString('utf8');
  }
}
