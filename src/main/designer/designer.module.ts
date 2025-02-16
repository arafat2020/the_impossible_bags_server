import { Module } from '@nestjs/common';
import { DesignerController } from './designer.controller';
import { DesignerService } from './designer.service';
import { DbService } from 'src/db/db.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [DesignerController],
  providers: [DesignerService, DbService, JwtService]
})
export class DesignerModule {}
