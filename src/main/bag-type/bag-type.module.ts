import { Module } from '@nestjs/common';
import { BagTypeController } from './bag-type.controller';
import { BagTypeService } from './bag-type.service';

@Module({
  controllers: [BagTypeController],
  providers: [BagTypeService]
})
export class BagTypeModule {}
