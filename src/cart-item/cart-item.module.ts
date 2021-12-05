import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from 'src/product/product.module';
import { CartItemController } from './cart-item.controller';
import { CartItemService } from './cart-item.service';
import { CartItemSchema } from './schemas/cartItem.schema';

@Module({
  imports: [
    ProductModule,
    MongooseModule.forFeature([
      {name: 'item', schema: CartItemSchema}
    ])
  ],
  controllers: [CartItemController],
  providers: [CartItemService],
  exports: [CartItemService]
})
export class CartItemModule {}
