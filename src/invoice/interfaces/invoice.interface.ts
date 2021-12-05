import { Document } from "mongoose";

export interface IInvoice extends Document {
    readonly firstName: string;
    readonly lasName: string;    
    readonly email: string;
    readonly phone: string;
    readonly address: string;
    readonly documentId: number;
    //readonly products: [];
    readonly orderDate: Date; 
}