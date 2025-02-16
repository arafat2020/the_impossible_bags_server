import { ApiProperty } from "@nestjs/swagger";
import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export class CreateDesigner extends createZodDto(z.object({
    name: z.string(),
})) {
    @ApiProperty({
        example: "John Doe",
        description: "The full name of the designer",
    })
    name: string;
}

export class ConnectDesignerDto extends createZodDto(z.object({
    productId: z.string().ulid(),
    designerId: z.string().ulid(),
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
    designerId: string
    
}

export class UpdateDesignerTypeDto extends createZodDto(z.object({
    id: z.string().ulid(),
    name: z.string(),
})) {

    @ApiProperty({
        example: "550e8400-e29b-41d4-a716-446655440000", // Corrected example
        description: "A UUID representing the unique identifier",
    })
    id: string

    @ApiProperty({
        example: "Andrew",
        description: "Designer Name",
    })
    name: string;
}
