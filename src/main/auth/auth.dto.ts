import { ApiProperty } from "@nestjs/swagger";
import { $Enums } from "@prisma/client";
import { createZodDto } from "nestjs-zod";
import { CreateUserSchema } from "src/interfaces/user.interface";

export class CreateUserDto extends createZodDto(CreateUserSchema) {
    @ApiProperty({
        example: "John Doe",
        description: "The full name of the user",
    })
    name: string;

    @ApiProperty({
        example: "john@example.com",
        description: "The email address of the user",
    })
    email: string;

    @ApiProperty({
        example: "securePass123",
        description: "The user's password (minimum 6 characters)",
    })
    password: string;

    @ApiProperty({
        example: "ADMIN",
        description: "The role assigned to the user",
        enum: $Enums.UserRole, // Automatically generates Swagger enum
    })
    role: $Enums.UserRole;

    @ApiProperty({
        type: 'string',
        format: 'binary',
        description: 'Profile picture file upload'
    })
    img: Express.Multer.File;

}

export class SignInDto {
    @ApiProperty({
      description: 'User email for sign-in',
      example: 'john.doe@example.com',
    })
    email: string;
  
    @ApiProperty({
      description: 'User password for sign-in',
      example: 'strongpassword123',
    })
    password: string;
  }
