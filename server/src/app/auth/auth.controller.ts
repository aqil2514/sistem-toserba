import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { PasetoGuard } from '../../guards/paseto.guard';
import passport from 'passport';

@Controller('auth')
export class AuthController {
  private webUrl = process.env.FRONTEND_URL;
  private isProd = process.env.NODE_ENV === 'production';
  @Get('me')
  @UseGuards(PasetoGuard)
  me(@Req() req) {
    return req.user;
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // redirect ke Google
  }

  @Get('google/callback')
  async googleCallback(@Req() req, @Res() res: Response) {
    passport.authenticate(
      'google',
      { session: false },
      (err: any, user: string) => {
        if (err || !user) {
          return res.redirect(`${this.webUrl}?error=unauthorized`);
        }

        res.cookie('auth_token', user, {
          httpOnly: true,
          sameSite: 'lax',
          secure: this.isProd,
          domain: this.isProd ? '.sistem-toserba.shop' : undefined,
          maxAge: 24 * 60 * 60 * 1000,
          path: '/',
        });

        return res.redirect(`${this.webUrl}/dashboard?login=success`);
      },
    )(req, res);
  }

  @Post('/logout')
  logout(@Res() res: Response) {
    res.clearCookie('auth_token', {
      httpOnly: true,
      secure: this.isProd,
      sameSite: 'lax',
      domain: this.isProd ? '.sistem-toserba.shop' : undefined,
      path: '/',
    });

    return res.redirect(`${this.webUrl}?logout=success`);
  }
}
