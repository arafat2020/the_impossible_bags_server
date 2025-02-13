import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { DbService } from 'src/db/db.service';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService, DbService],
})
export class ReviewsModule {}
