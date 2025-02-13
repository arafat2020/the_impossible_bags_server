import { IsString, IsNotEmpty, IsNumber, IsUUID, IsOptional } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;
}


export class UpdateReviewDto {
    @IsUUID() // Add validation to ensure it's a valid UUID
    @IsNotEmpty()
    id: string; // Add the id field to allow identification during updates
  
    @IsOptional()
    @IsNumber()
    rating?: number;
  
    @IsOptional()
    @IsString()
    comment?: string;
  }