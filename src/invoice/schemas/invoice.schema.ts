import { model, Schema } from "mongoose";

export const InvoiceSchema = new Schema({
    firstName: {type: String, required:true},
    lastName: {type: String, required:true},
    email: {type: String, required: true, unique: true},
    phone: {type: Number, required: true},
    address: {type: String, required: true},
    documentId: {type: Number, required: true},
    //products: { type: [], required: true},
    orderDate: {
        type: Date,
        default: Date.now
    }
});    

