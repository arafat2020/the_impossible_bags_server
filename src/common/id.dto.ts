import { ApiProperty } from "@nestjs/swagger";
import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export class IdDto extends createZodDto(z.object({
    id: z.string().uuid(),
})) {
    @ApiProperty({
        example: "550e8400-e29b-41d4-a716-446655440000", // Corrected example
        description: "A UUID representing the unique identifier",
      })
      id: string
}