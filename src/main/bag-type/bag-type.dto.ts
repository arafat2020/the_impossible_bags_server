import { ApiProperty } from "@nestjs/swagger";
import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export class CrateBagTypeDto extends createZodDto(z.object({
    name: z.string(),
})) {
    @ApiProperty({
        example: "Bag Type",
        description: "Bag type of bags",
    })
    name: string;
}

export class UpdateBagTypeDto extends createZodDto(z.object({
    id: z.string().ulid(),
    name: z.string(),
})) {

    @ApiProperty({
        example: "550e8400-e29b-41d4-a716-446655440000", // Corrected example
        description: "A UUID representing the unique identifier",
    })
    id: string

    @ApiProperty({
        example: "Bag Type",
        description: "Bag type of bags",
    })
    name: string;
}

export class ConnectBagTypeDto extends createZodDto(z.object({
    productId: z.string().ulid(),
    bagId: z.string().ulid(),
})){

    @ApiProperty({
        example: "550e8400-e29b-41d4-a716-446655440000", // Corrected example
        description: "A UUID representing the unique identifier",
    })
    productId: string

    @ApiProperty({
        example: "550e8400-e29b-41d4-a716-446655440000", // Corrected example
        description: "A UUID representing the unique identifier",
    })
    bagId: string
    
}