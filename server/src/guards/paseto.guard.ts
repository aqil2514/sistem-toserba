import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PasetoService } from '../app/auth/paseto.service';

@Injectable()
export class PasetoGuard implements CanActivate {
  constructor(private readonly pasetoService: PasetoService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const token = req.cookies?.auth_token;
    if (!token) {
      throw new UnauthorizedException('Token tidak ditemukan');
    }

    try {
      const payload = await this.pasetoService.verify(token);
      req.user = payload;

      return true;
    } catch {
      throw new UnauthorizedException('Token tidak valid');
    }
  }
}
