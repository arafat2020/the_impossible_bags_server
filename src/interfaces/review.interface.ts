import { z } from "zod";

export const CreateReviewSchema = z.object({
    rating: z.number().min(1).max(5), // Assuming rating is between 1 and 5
    comment: z.string().min(1, "Comment cannot be empty"),
    productId: z.string().uuid(),
    userId: z.string().uuid(),
  });

  export const UpdateReviewSchema = z.object({
    id: z.string().uuid(),
    rating: z.number().min(1).max(5).optional(),
    comment: z.string().optional(),
  });
  