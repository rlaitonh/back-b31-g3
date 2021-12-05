export class CreateProductDTO {
    readonly category: string;
    readonly name: string;
    readonly unitValue: number;
    readonly stock: number;
    readonly description: string;
    readonly image: string;
    readonly createdAt:Date;
}