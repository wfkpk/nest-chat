import { Injectable } from '@nestjs/common';
import {
  KeyObject,
  publicEncrypt,
  privateDecrypt,
  createPublicKey,
  createPrivateKey,
} from 'crypto';

@Injectable()
export class AsymmetricEncryptionService {
  private publicKey: KeyObject;
  private privateKey: KeyObject;

  constructor() {
    this.loadKeysFromEnvironment();
  }

  private loadKeysFromEnvironment() {
    const publicKeyPEM = process.env.PUBLIC_KEY;
    const privateKeyPEM = process.env.PRIVATE_KEY;

    if (publicKeyPEM && privateKeyPEM) {
      this.publicKey = createPublicKey(publicKeyPEM);
      this.privateKey = createPrivateKey(privateKeyPEM);
    } else {
      throw new Error(
        'Public and private keys are missing in the environment variables.',
      );
    }
  }

  encrypt(data: string): Buffer {
    return publicEncrypt(this.publicKey, Buffer.from(data));
  }

  decrypt(data: Buffer): string {
    return privateDecrypt(this.privateKey, data).toString();
  }
}
