import { Injectable } from '@nestjs/common';

@Injectable()
export class PasetoService {
  private readonly key = process.env.PASETO_SECRET!;

  async sign(payload: Record<string, any>) {
    const { encrypt } = await import('paseto-ts/v4');

    return encrypt(this.key, payload, {
      addExp: false,
      addIat: false,

    });
  }

  async verify(token: string) {
    const { decrypt } = await import('paseto-ts/v4');

    const { payload } = decrypt(this.key, token);
    return payload;
  }
}
