import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './google.strategy';
import { PasetoService } from './paseto.service';

@Global()
@Module({
  imports: [PassportModule],
  providers: [AuthService, GoogleStrategy, PasetoService],
  controllers: [AuthController],
  exports:[PasetoService]
})
export class AuthModule {}
