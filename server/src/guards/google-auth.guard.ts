import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  constructor() {
    super({
      failureRedirect:
        'http://localhost:3000/login?error=unauthorized',
    });
  }
}
