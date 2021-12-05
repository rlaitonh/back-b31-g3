import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDTO {

    @IsNotEmpty() readonly firstname: string;
    @IsNotEmpty() readonly lastname: string;
    @IsNotEmpty() @IsEmail() readonly email: string;
    @IsNotEmpty() readonly password: string;
    readonly state?: string;
    readonly role?: string;
}