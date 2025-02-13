import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { DbService } from 'src/db/db.service';
import { UploadService } from 'src/lib/upload/upload.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [
    ProductsService, 
    DbService, 
    UploadService, 
    ConfigService,
    JwtService
  ],
  controllers: [ProductsController]
})
export class ProductsModule {}
