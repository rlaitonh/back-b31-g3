import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createInvoiceDTO } from './dto/create_invoice.dto';
import { IInvoice } from './interfaces/invoice.interface';

@Injectable()
export class InvoiceService {
    constructor(@InjectModel('Invoice') private readonly invoiceModel: Model<IInvoice>){}

    getInvoices(): Promise<IInvoice[]> {
        const invoice = this.invoiceModel.find();
        return Promise.resolve(invoice);
    }
    async createInvoice(createInvoiceDTO: createInvoiceDTO): Promise<IInvoice>{
        const invoice = new this.invoiceModel(createInvoiceDTO);
        await invoice.save();
        return invoice;
    }
    async deleteInvoice(invoiceId: string):Promise<IInvoice>{
        const deletedInvoice = await this.invoiceModel.findByIdAndDelete(invoiceId);
        return deletedInvoice;
    }    
}
