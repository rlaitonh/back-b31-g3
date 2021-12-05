import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CreateProductDTO } from './dto/create_product.dto';

@Controller('cart-item')
export class CartItemController {
    constructor(private readonly cartItemService:CartItemService){}

    
    @Post('create')
    async createNewProduct(@Res() res, @Body() createProductDTO:CreateProductDTO){
        const product = await this.cartItemService.createCartItem(createProductDTO);
        return res.status(HttpStatus.CREATED).send(product);
    }
}
