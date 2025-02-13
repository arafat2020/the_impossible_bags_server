import { Controller, Post, Body, Param, Put, Delete, Get } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto, UpdateReviewDto } from './review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  // Create a new review
  @Post()
  async createReview(@Body() createReviewDto: CreateReviewDto) {
    return await this.reviewsService.createReview({ data: createReviewDto });
  }

  // Update an existing review
  @Put(':id')
  async updateReview(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto
  ) {
    // Only keep the fields from updateReviewDto that are not the id
    const reviewWithId = { ...updateReviewDto, id }; // Put `id` last so it doesn't get overwritten
    return await this.reviewsService.updateReview({ review: reviewWithId });
  }
  

  // Delete a review
  @Delete(':id')
  async deleteReview(@Param('id') id: string) {
    return await this.reviewsService.deleteReview(id);
  }

  // Get all reviews for a product
  @Get('product/:productId')
  async getReviewsForProduct(@Param('productId') productId: string) {
    return await this.reviewsService.getReviewsForProduct(productId);
  }

  // Get a review by ID
  @Get(':id')
  async getReviewById(@Param('id') id: string) {
    return await this.reviewsService.getReviewById(id);
  }
}
