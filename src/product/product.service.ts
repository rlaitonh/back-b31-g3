import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDTO } from './dto/create_product.dto';
import { IProduct } from './interfaces/product.interface';


@Injectable()
export class ProductService {

    constructor(@InjectModel('Product') private readonly productModel : Model<IProduct> ){ 
    }

    async getProducts():Promise<IProduct[]>{
        const products = await this.productModel.find();
        return Promise.resolve(products);
    }
    async getProductById(productId: string):Promise<IProduct>{
        const product = await this.productModel.findById(productId);
        return product;
    }
    async getProductByName(productName: string):Promise<IProduct[]>{
        const product = await this.productModel.find({name: { $regex: '.*' + productName + '.*' }});
        return product;
    }    
    async getProductByCategory(productCategory: string):Promise<IProduct[]>{
        const product = await this.productModel.find({category: productCategory});
        return product;
    }    
    async getProductBy(name: string, category: string ):Promise<IProduct[]>{
        const product = await this.productModel.find({ category }).or([{ name }]);
        return product;
    }
    async createProduct(createProductDTO: CreateProductDTO): Promise<IProduct>{
        const product = new this.productModel(createProductDTO);
        await product.save();       
        return product;
    }
    async updateProduct(productId: string, createProductDTO: CreateProductDTO):Promise<IProduct>{
        const product = await this.productModel.findByIdAndUpdate(productId, createProductDTO)
        return product;
    }      
    async deleteProduct(productId: string):Promise<IProduct>{
        const product = await this.productModel.findByIdAndDelete(productId);
        return product;
    }

}


