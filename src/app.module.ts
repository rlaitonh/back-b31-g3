import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { InvoiceModule } from './invoice/invoice.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ProductModule,
    MongooseModule.forRoot('mongodb+srv://root:root@cluster0.owoam.mongodb.net/db_onlyPans3?retryWrites=true&w=majority' ,{  //BD Ricardo: 'mongodb+srv://root:1234@cluster0.qf0yy.mongodb.net/onlypans_DB?retryWrites=true&w=majority' Loren: 
    useNewUrlParser: true                                                                                                                                                   
    }),
    ShoppingCartModule,
    InvoiceModule,
    CartItemModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
