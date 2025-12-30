import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { PasetoGuard } from '../../guards/paseto.guard';
import passport from 'passport';

@Controller('auth')
export class AuthController {
  private isDevelopment = process.env.NODE_ENV === 'development';
  private webUrl = this.isDevelopment ? "http://localhost:3000" :"https://www.sistem-toserba.shop"
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
  sameSite: 'none',
  secure: true,
  domain: '.sistem-toserba.shop',
  maxAge: 60 * 60 * 1000,
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
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return res.redirect(`${this.webUrl}?logout=success`);
  }
}
