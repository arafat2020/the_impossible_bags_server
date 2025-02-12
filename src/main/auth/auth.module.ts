import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DbService } from 'src/db/db.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UploadService } from 'src/lib/upload/upload.service';
import { LibService } from 'src/lib/lib.service';

@Module({
  providers: [
    AuthService, 
    DbService,
    JwtService,
    ConfigService,
    UploadService,
    LibService
  ],
  controllers: [AuthController],
})
export class AuthModule {}
