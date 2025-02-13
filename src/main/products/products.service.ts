import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { UploadService } from 'src/lib/upload/upload.service';
import { FileInstance, Product } from '@prisma/client';

@Injectable()
export class ProductsService {
    constructor(
        private readonly db: DbService,
        private readonly upload: UploadService,
    ) { }

    private async isExists(id: string) {
        const product = await this.db.product.findUnique({
            where: {
                id
            },
            include: {
                primaryImg: true
            }
        })

        if (!product) throw new HttpException(`Product with id ${id} does not exist`, HttpStatus.NOT_FOUND)

        return product
    }

    private async deleteAndUploadImg(file: Express.Multer.File, prevFileId?: string) {

        if (prevFileId) {
            await this.upload.deleteFile(prevFileId)
        }
        const newFile = await this.upload.uploadFile({
            file,
        })
        return newFile
    }

    public async createProduct({
        data,
        img
    }: {
        data: CreateProductDto,
        img: Express.Multer.File
    }) {
        const imgInstance = await this.upload.uploadFile({
            file: img
        })
        const product = await this.db.product.create({
            data: {
                name: data.name,
                description: data.description,
                price: data.price,
                quantity: data.quantity,
                tag: data.tag,
                primaryImg: {
                    connect: {
                        id: imgInstance.id
                    }
                }
            },
            include: {
                primaryImg: {
                    select: {
                        fileUrl: true
                    }
                }
            }
        })

        return {
            product,
            success: true,
            message: "Product created successfully"
        }
    }

    public async updateAllProduct({
        product,
        file
    }: {
        product: UpdateProductDto,
        file: Express.Multer.File
    }) {
        const {
            id,
            ...rest
        } = product
        const isExisting = await this.isExists(product.id)
        let fileInstance: FileInstance | undefined
        if (file) {
            fileInstance = await this.deleteAndUploadImg(file, isExisting.primaryImg?.fileId)
        }
        const updatedProduct = await this.db.product.update({
            where: {
                id
            },
            data: {
               ...rest,
                primaryImg: fileInstance? {
                    connect: {
                        id: fileInstance.id
                    }
                } : undefined
            },
            include: {
                primaryImg: {
                    select: {
                        fileUrl: true
                    }
                }
            }
        })

        return updatedProduct
    }

}
