import { CreateCartIemDTO } from "src/cart-item/dto/create_cartItem.dto";

export class CreateShoppingCartDTO {
    user: string;
    items: [CreateCartIemDTO];
    total: number;
}