import { Schema } from "mongoose";
import { ProductSchema } from "src/product/schemas/product.schema";

export const CartItemSchema = new Schema ({
    details: {type: [ProductSchema], required: true},
    quantity: {type: Number, required: true},
    subtotal: {type: Number, required: true}
})