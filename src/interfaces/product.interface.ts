import { z } from 'zod';

export const ProductSchema = z.object({
  name: z.string().min(1).max(255), // Ensures name is between 1 and 255 characters
  id: z.string().uuid(), // Ensures it's a valid UUID
  description: z.string(), // Description is optional
  price: z.number().nonnegative(), // Price must be a positive number
  quantity: z.number().int().nonnegative(), // Quantity must be a non-negative integer
  primaryImg: z.string().url(), // Must be a valid URL
  showcaseImage: z.array(z.string().url()), // Array of valid image URLs
  tag: z.array(z.string()), // Array of strings (tags)
  designerId: z.string().uuid().nullable(), // Nullable UUID for designerId
  typeId: z.string().uuid().nullable(), // Nullable UUID for typeId
  shopId: z.string().uuid().nullable(), // Nullable UUID for shopId
});

export type ProductDto = z.infer<typeof ProductSchema>;

export const CreateProductSchema = z.object({
  name: z.string().min(1).max(255), // Ensures name is between 1 and 255 characters // Ensures it's a valid UUID
  description: z.string(), // Description is optional
  price: z.number().nonnegative(), // Price must be a positive number
  quantity: z.number().int().nonnegative(), // Quantity must be a non-negative integer
  tag: z.array(z.string()),
})

export const UpdateProductSchema = z.object({
  name: z.string().min(1).optional(), // Ensures name is between 1 and 255 characters
  id: z.string().uuid(), // Ensures it's a valid UUID
  description: z.string().optional(), // Description is optional
  price: z.number().nonnegative().optional(), // Price must be a positive number
  quantity: z.number().int().nonnegative().optional(), // Quantity must be a non-negative integer
  primaryImg: z.string().url().optional(),
  tag: z.array(z.string()).optional(),
})
