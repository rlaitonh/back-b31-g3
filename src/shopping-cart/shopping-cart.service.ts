import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartItemService } from 'src/cart-item/cart-item.service';
import { CreateProductDTO } from 'src/cart-item/dto/create_product.dto';
import { IshoppingCart } from './interfaces/shoppingCart.interface';

@Injectable()
export class ShoppingCartService {
        constructor (@InjectModel('cart') private readonly cartModel: Model<IshoppingCart>,  private readonly cartItemService: CartItemService ){}
//        private cart = new this.cartModel();

        getCart(): Promise<IshoppingCart[]> { //Este servicio solo debe poder usarlo el admin del sistema
                const cart = this.cartModel.find();
                return Promise.resolve(cart);
        }
        async addCartItem(createProductDTO:CreateProductDTO, userId:string){
                const item = await this.cartItemService.createCartItem(createProductDTO);
                const cart = new this.cartModel();
                cart.items.push(item);
                cart.user = userId;
                cart.total = item.subtotal;
                await cart.save();         
                return cart;
        }
        async getCartByUser(cartUserId: string):Promise<IshoppingCart>{
                const cart = await this.cartModel.findById(cartUserId);
                return cart;
        }



        /*async createProduct(createProductDTO: CreateProductDTO): Promise<IProduct>{
                const product = new this.productModel(createProductDTO);
                await product.save();       
                return product;
    async createUser( createUserDTO: CreateUserDTO):Promise<IUser>{
        const user = new this.userModel(createUserDTO);
        await user.save();
        return user;
    }
                if(!user){
            throw new NotFoundException('Student does not exists');
        }

        return res.status(HttpStatus.OK).json({
            message: 'User found',
            data: user
        });
        }*/
        

}