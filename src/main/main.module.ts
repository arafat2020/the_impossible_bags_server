import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { ReviewsModule } from './reviews/reviews.module';
import { BagTypeModule } from './bag-type/bag-type.module';
import { BillingsModule } from './billings/billings.module';
import { ContactModule } from './contact/contact.module';
import { DesignerModule } from './designer/designer.module';

@Module({
  imports: [
    AuthModule,
    ProductsModule,
    ReviewsModule,
    BagTypeModule,
    BillingsModule,
    ContactModule,
    DesignerModule,
  ],
})
export class MainModule {}
