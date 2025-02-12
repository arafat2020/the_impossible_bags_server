import { Body, Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './auth.dto';
import { ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @Post('signup')
    @Post('signup')
    @ApiConsumes('multipart/form-data') // 🚀 Important for Swagger/OpenAPI
    @UseInterceptors(FileInterceptor('img'))
    public async signUp(@Body() userData: CreateUserDto, @UploadedFile(
        new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB limit
                new FileTypeValidator({ fileType: /(jpeg|png|jpg|gif|webp)$/ }),
            ],
        })
    ) img: Express.Multer.File) {
        return this.authService.signUp({userData, img});
    }
}
