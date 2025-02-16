import { Module } from '@nestjs/common';
import { DesignerController } from './designer.controller';
import { DesignerService } from './designer.service';
import { DbService } from 'src/db/db.service';

@Module({
  controllers: [DesignerController],
  providers: [DesignerService, DbService]
})
export class DesignerModule {}
