import { Injectable } from '@nestjs/common';
import { PasetoService } from './paseto.service';

@Injectable()
export class AuthService {
  constructor(private readonly pasetoService: PasetoService) {}

  async validateOAuthLogin(profile: any) {
    if (!profile?.providerId) return null;

    const allowedEmails = process.env.ALLOWED_EMAILS?.split(',') ?? [];
    if (!allowedEmails.includes(profile.email)) return null;

    return this.pasetoService.sign({
      provider: profile.provider,
      providerId: profile.providerId,
      email: profile.email,
      name: profile.name,
      avatar: profile.avatar,
      role: 'admin',
    });
  }
}
