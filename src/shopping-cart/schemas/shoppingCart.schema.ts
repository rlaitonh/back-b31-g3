import { Schema } from "mongoose";
import { CartItemSchema } from "src/cart-item/schemas/cartItem.schema";


export const shoppingCartSchema = new Schema ({
    user: {type: Schema.Types.ObjectId, ref: 'user', required: false, unique: true},
    //user: {type: String, required: false, unique: true},
    items: {type: [CartItemSchema], required: true},
    total: {type: Number, required: true}
})