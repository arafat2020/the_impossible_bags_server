import { Body, Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, SignInDto} from './auth.dto';
import { ApiConsumes, ApiOkResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

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

    @Post("signIn")
    public async signIn(@Body() userData: SignInDto) {
        return this.authService.signIn(userData)
    }

}
