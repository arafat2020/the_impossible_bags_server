import { Module } from '@nestjs/common';
import { BagTypeController } from './bag-type.controller';
import { BagTypeService } from './bag-type.service';
import { DbService } from 'src/db/db.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [BagTypeController],
  providers: [BagTypeService, DbService, JwtService]
})
export class BagTypeModule {}
