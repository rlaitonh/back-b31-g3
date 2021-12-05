import { Document } from "mongoose";
import { CreateProductDTO } from "src/product/dto/create_product.dto";
export interface ICartItem extends Document {
    details: [CreateProductDTO];
    quantity: number;
    subtotal: number;
}