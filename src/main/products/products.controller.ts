import {
    Body,
    Controller,
    FileTypeValidator,
    Get,
    MaxFileSizeValidator,
    ParseFilePipe,
    Patch,
    Post,
    Query,
    UploadedFile,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { BulkImgUploadDto, CreateProductDto, UpdateProductDto } from './product.dto';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';
import { SellerGuard } from 'src/auth/seller.guard';
import { AdminGuard } from 'src/auth/admin.guard';
import { AdminOrSellerGuard } from 'src/auth/sellerOrAdmin.guard';
import { PaginationDto } from 'src/common/pagination.dto';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
    ) { }

    @Post('/create')
    @ApiConsumes('multipart/form-data')
    @ApiBearerAuth()
    @UseGuards(
        AuthGuard,
        AdminOrSellerGuard
    ) // 🚀 Important for Swagger/OpenAPI
    @UseInterceptors(FileInterceptor('primaryImg'))
    public createProduct(
        @Body() product: CreateProductDto,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB limit
                    new FileTypeValidator({ fileType: /(jpeg|png|jpg|gif|webp)$/ }),
                ],
            })) img: Express.Multer.File,
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
                fileIsRequired: false,

            })) img: Express.Multer.File,
    ) {
        return await this.productsService.updateAllProduct({
            product,
            file: img
        })
    }

    @Post('upload-showcase-img')
    @ApiConsumes('multipart/form-data')
    @ApiBearerAuth()
    @UseGuards(
        AuthGuard,
        AdminOrSellerGuard
    ) // 🚀 Important for Swagger/OpenAPI
    @UseInterceptors(FileFieldsInterceptor([{
        name: 'img',
        maxCount: 5
    }]))
    async uploadShowcaseImg(
        @Body() showcaseImage: BulkImgUploadDto,
        @UploadedFiles(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 100 * 1024 * 1024 }), // 5MB limit
                    new FileTypeValidator({ fileType: /(jpeg|png|jpg|gif|webp)$/ }),
                ],
                fileIsRequired: false,
            })) imgs: { img: Array<Express.Multer.File> },
    ) {

        return this.productsService.bulkImageUpload({
            product: showcaseImage,
            img: imgs.img
        })
    }

    @Get('getAll')
    async getAllProducts(@Query() pagination: PaginationDto) {
        return await this.productsService.getAllProduct(pagination);
    }
}
