import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service'; // Adjust path as per your setup
import { CreateReviewDto, UpdateReviewDto } from './review.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Reviews} from '@prisma/client';

@Injectable()
export class ReviewsService {
  constructor(private readonly db: DbService) {}

  // Check if the review exists
  private async isExists(id: string): Promise<Reviews> {
    const review = await this.db.reviews.findUnique({
      where: { id },
      include: {
        user: true,   // Assuming you want user details
        Product: true // Assuming you want product details
      }
    });

    if (!review) {
      throw new HttpException(`Review with id ${id} does not exist`, HttpStatus.NOT_FOUND);
    }

    return review;
  }

  // Create a new review
  public async createReview({ data }: { data: CreateReviewDto }) {
    const review = await this.db.reviews.create({
      data: {
        rating: data.rating,
        comment: data.comment,
        productId: data.productId,
        userId: data.userId,
      },
    });

    return {
      review,
      success: true,
      message: 'Review created successfully',
    };
  }

  // Update an existing review
  public async updateReview({ review }: { review: UpdateReviewDto }) {
    const { id, ...rest } = review;
    const existingReview = await this.isExists(id);

    const updatedReview = await this.db.reviews.update({
      where: { id },
      data: { ...rest },
    });

    return updatedReview;
  }

  // Delete a review
  public async deleteReview(id: string) {
    await this.isExists(id); // Check if the review exists before deleting

    await this.db.reviews.delete({
      where: { id },
    });

    return {
      success: true,
      message: 'Review deleted successfully',
    };
  }

  // Get all reviews for a product or a user
  public async getReviewsForProduct(productId: string) {
    const reviews = await this.db.reviews.findMany({
      where: { productId },
      include: {
        user: true, // Include user details
      }
    });
    return reviews;
  }

  // Get a review by ID
  public async getReviewById(id: string) {
    const review = await this.isExists(id); // Reuse the isExists function to fetch review
    return review;
  }
}
