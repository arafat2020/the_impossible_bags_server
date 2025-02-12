import { Module } from '@nestjs/common';
import { LibService } from './lib.service';
import { UploadService } from './upload/upload.service';
import { ConfigService } from '@nestjs/config';
import { DbService } from 'src/db/db.service';

@Module({
  providers: [LibService, UploadService, ConfigService, DbService]
})
export class LibModule {}
