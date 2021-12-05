import { Document } from "mongoose";
import { CreateCartIemDTO } from "src/cart-item/dto/create_cartItem.dto";
export interface IshoppingCart extends Document {
    user: string;
    items: [CreateCartIemDTO];
    total: number;
}