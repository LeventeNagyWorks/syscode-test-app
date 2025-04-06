/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy as Strategy } from 'passport-http';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }

  validate(username: string, password: string): any {
    // Itt egyszerű felhasználónév/jelszó ellenőrzés
    // Valós alkalmazásban ez adatbázisból jönne
    if (username === 'admin' && password === 'password') {
      return { userId: 1, username: username };
    }
    throw new UnauthorizedException();
  }
}
