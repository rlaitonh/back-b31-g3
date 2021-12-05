/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty } from "class-validator";

export class UserDTO{
    @IsNotEmpty() readonly firstname: string;
    @IsNotEmpty() readonly lastname: string;
    @IsNotEmpty() @IsEmail() readonly email: string;
                readonly state?: string;
                readonly role?: string;
}