import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';
import { CreateReviewSchema, UpdateReviewSchema } from 'src/interfaces/review.interface';

// export class CreateReviewDto {
//   @IsNotEmpty()
//   @IsNumber()
//   rating: number;

//   @IsString()
//   @IsNotEmpty()
//   comment: string;

//   @IsUUID()
//   @IsNotEmpty()
//   productId: string;

//   @IsUUID()
//   @IsNotEmpty()
//   userId: string;
// }


// export class UpdateReviewDto {
//     @IsUUID() // Add validation to ensure it's a valid UUID
//     @IsNotEmpty()
//     id: string; // Add the id field to allow identification during updates
  
//     @IsOptional()
//     @IsNumber()
//     rating?: number;
  
//     @IsOptional()
//     @IsString()
//     comment?: string;
//   }

  export class CreateReviewDto extends createZodDto(CreateReviewSchema) {
    @ApiProperty({ description: 'Rating between 1 and 5', example: 5 })
    rating: number;
  
    @ApiProperty({ description: 'Review comment', example: 'Great product!' })
    comment: string;
  
    @ApiProperty({ description: 'UUID of the product being reviewed' })
    productId: string;
  
    @ApiProperty({ description: 'UUID of the user writing the review' })
    userId: string;
  }

  export class UpdateReviewDto extends createZodDto(UpdateReviewSchema) {
    @ApiProperty({ description: 'UUID of the review', example: '550e8400-e29b-41d4-a716-446655440000' })
    id: string;
  
    @ApiPropertyOptional({ description: 'Updated rating between 1 and 5', example: 4 })
    rating?: number;
  
    @ApiPropertyOptional({ description: 'Updated review comment', example: 'Still a great product, but delivery was slow.' })
    comment?: string;
  }