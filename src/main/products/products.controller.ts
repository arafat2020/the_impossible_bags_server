import { Body, Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';
import { SellerGuard } from 'src/auth/seller.guard';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
    ){}

    @Post('/create')
    @ApiConsumes('multipart/form-data')
    @ApiBearerAuth()
    @UseGuards(
        AuthGuard,
        SellerGuard,
        AdminGuard
    ) // 🚀 Important for Swagger/OpenAPI
    @UseInterceptors(FileInterceptor('file'))
    public createProduct(
        @Body() product: CreateProductDto,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB limit
                    new FileTypeValidator({ fileType: /(jpeg|png|jpg|gif|webp)$/ }),
                ],
            }))   img: Express.Multer.File,
    ) {
      return this.productsService.createProduct({
        data: product,
        img,
      })
    }

    @Patch('/update')
    @ApiConsumes('multipart/form-data')
    @ApiBearerAuth()
    @UseGuards(
        AuthGuard,
        SellerGuard,
        AdminGuard
    ) // 🚀 Important for Swagger/OpenAPI
    @UseInterceptors(FileInterceptor('img'))
    async updateProduct(
        @Body() product: UpdateProductDto,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB limit
                    new FileTypeValidator({ fileType: /(jpeg|png|jpg|gif|webp)$/ }),
                ],
                fileIsRequired: false
            }))   img: Express.Multer.File,
    ){
        
    }
}
