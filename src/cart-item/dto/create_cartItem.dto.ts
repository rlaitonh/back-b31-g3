import { CreateProductDTO } from "src/product/dto/create_product.dto";

export class CreateCartIemDTO {
    details: [CreateProductDTO];
    quantity: number;
    subtotal: number;
}