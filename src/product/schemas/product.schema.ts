import { Schema } from "mongoose";
const root:string = '';
export const ProductSchema = new Schema({

    category: {
        type: String, 
        enum: ['Tenis', 'Casual','Formal', 'Botas','Botines','Tacones', 'Zandalias'],
        required: true
    },
    name: {type: String, required: true},
    unitValue: {type: Number, required: true },
    stock: {type: Number, required: true},
    description:  {type: String, required: true},
    image: {type: String, get: v => `${root}${v}`, required: true},
    createdAt: {
        type: Date,
        default: Date.now
    }
});
