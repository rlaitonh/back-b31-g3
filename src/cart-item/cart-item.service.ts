import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductService } from 'src/product/product.service';
import { CreateCartIemDTO } from './dto/create_cartItem.dto';
import { CreateProductDTO } from './dto/create_product.dto';
import { ICartItem } from './interfaces/cartItem.interface';


@Injectable()
export class CartItemService {
    constructor (@InjectModel('item') private readonly itemModel: Model<ICartItem>, private readonly productService: ProductService ){}

    async createCartItem(createProductDTO:CreateProductDTO){
        const {productId, quantity} = createProductDTO;
        const item = new this.itemModel();
        const product = await this.productService.getProductById(productId);
        item.details.push(product);
        item.quantity = quantity;
        item.subtotal = product.unitValue*quantity;
        return item;
    }    
}
