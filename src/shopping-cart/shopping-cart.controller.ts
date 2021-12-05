import { Body, Controller, ForbiddenException, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { CreateProductDTO } from 'src/cart-item/dto/create_product.dto';
import { ShoppingCartService } from './shopping-cart.service';

@Controller('cart')
export class ShoppingCartController {
    constructor(private readonly shoppingCartService:ShoppingCartService ){}
    @Get()
    async getCart(@Res() res){
        const cart = await this.shoppingCartService.getCart();      
        return res.status(HttpStatus.OK).send(cart);
    }  

    @Post('create/:userId')
    async addCartItem(@Res() res, @Body() createProductDTO:CreateProductDTO, @Param('userId') userId){
       // const cart = await this.shoppingCartService.addCartItem(createProductDTO, userId);
        
        const cart = await this.shoppingCartService.getCartByUser(userId);
        if (!cart){
            const cart = await this.shoppingCartService.addCartItem(createProductDTO, userId)
            return res.status(HttpStatus.CREATED).send(cart)
        }
        return "no sirvió";
        //throw new ForbiddenException()
    }
    /*
    @Get()
    async getProductList(@Res() res){
        const products = await this.productService.getProducts();

        return res.status(HttpStatus.OK).send(products);
    }

    @Get('/getBy')
    async getProductBy(
        @Res() res, 
        @Query('productName') name,
        @Query('productCategory') category
        ){
        
        const product = await this.productService.getProductBy(name, category);

        if(!product){
            throw new NotFoundException('Student does not exists');
        }

        return res.status(HttpStatus.OK).send(product);
    }    
    
    @Get('id/:productId')
    async getProductById(@Res() Res, @Param('productId')id){
        const product = await this.productService.getProductById(id);
        if (!product){
            throw new NotFoundException('product does not found');
        }
        return Res.status(HttpStatus.OK).send(product);
    }
    @Get('name/:productName')
    async getProductByName(@Res() Res, @Param('productName')name){
        const product = await this.productService.getProductByName(name);
        if (!product){
            throw new NotFoundException('product does not found');
        }
        return Res.status(HttpStatus.OK).send(product);
    }
    @Get('category/:productCategory')
    async getProductByCategory(@Res() Res, @Param('productCategory')category){
        const product = await this.productService.getProductByCategory(category);
        if (!product){
            throw new NotFoundException('product does not found');
        }
        return Res.status(HttpStatus.OK).send(product);
    }

    @Put('/update/:productId')
    async updateStudent(  @Res() res, @Body() createProductDTO: CreateProductDTO, @Param('productId') id){
        const product = await this.productService.updateProduct(id, createProductDTO);

        if(!product){
            throw new NotFoundException('product does not exists');
        }

        return res.status(HttpStatus.OK).send(product);
    }
    @Delete('/delete')
    async deleteStudent(@Res() res, @Query('productId') id){
        
        const product = await this.productService.deleteProduct(id);

        if(!product){
            throw new NotFoundException('Student does not exists');
        }

        return res.status(HttpStatus.OK).send(product);
    }*/

}
