/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { BasicStrategy } from './basic.strategy';

@Module({
  imports: [PassportModule],
  providers: [BasicStrategy],
  exports: [PassportModule],
})
export class AuthModule {}
