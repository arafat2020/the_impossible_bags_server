import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { DbService } from 'src/db/db.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService, DbService, JwtService],
})
export class ReviewsModule {}
