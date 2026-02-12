import { Injectable } from '@nestjs/common';

@Injectable()
export class PasetoService {
  private readonly key = process.env.PASETO_SECRET!;

  async sign(payload: Record<string, any>) {
    const { encrypt } = await import('paseto-ts/v4');

    const now = Math.floor(Date.now() / 1000);

    return encrypt(
      this.key,
      { ...payload, exp: (now + 60 * 60 * 24).toString(), iat: now.toString() },
      {
        addExp: false,
        addIat: false,
      },
    );
  }

  async verify(token: string) {
    const { decrypt } = await import('paseto-ts/v4');

    const { payload } = decrypt(this.key, token);
    return payload;
  }
}
