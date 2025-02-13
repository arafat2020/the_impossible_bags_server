import { z } from "zod";
import { $Enums } from "@prisma/client"; // Import Prisma Enums if using Prisma

const UserSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    img: z.string().url("Invalid image URL"),
    role: z.nativeEnum($Enums.UserRole), // Use nativeEnum for Prisma enums
});
const CreateUserSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    role: z.nativeEnum($Enums.UserRole), // Use nativeEnum for Prisma enums
})

const SignInSchema = z.object({
    email: z.string().email().min(5).max(100),  // Validate email format and length
    password: z.string().min(6).max(128),      // Validate password length
});

export {
    UserSchema,
    CreateUserSchema,
    SignInSchema
}
