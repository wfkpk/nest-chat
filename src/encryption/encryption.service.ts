import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

@Injectable()
export class EncryptionService {
  private readonly algorithm = 'aes-256-cbc';
  private readonly ivLength = 16; // IV length for AES-256-CBC

  encrypt(message: string, key: string): string {
    const iv = randomBytes(this.ivLength);
    const cipher = createCipheriv(this.algorithm, key, iv);

    let encrypted = cipher.update(message, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return iv.toString('hex') + encrypted;
  }

  decrypt(encryptedMessage: string, key: string): string {
    const iv = Buffer.from(encryptedMessage.slice(0, this.ivLength * 2), 'hex');
    const decipher = createDecipheriv(this.algorithm, key, iv);

    let decrypted = decipher.update(
      encryptedMessage.slice(this.ivLength * 2),
      'hex',
      'utf8',
    );
    decrypted += decipher.final('utf8');

    return decrypted;
  }
}
