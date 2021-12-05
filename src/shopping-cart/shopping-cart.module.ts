import { Module } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartController } from './shopping-cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { shoppingCartSchema } from './schemas/shoppingCart.schema';
import { CartItemModule } from 'src/cart-item/cart-item.module';

@Module({
  imports: [
    CartItemModule,
    MongooseModule.forFeature([
      {name: 'cart', schema: shoppingCartSchema}
    ])
  ],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService]
})
export class ShoppingCartModule {}
