import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from 'src/user/dto/create_user.dto';
import { LoginUserDTO } from 'src/user/dto/login_user.dto';
import { UserDTO } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { IJWTPayload } from './interfaces/jwt.payload.interface';
import { IloginStatus } from './interfaces/login_status.interface';
import { IRegistrationStatus } from './interfaces/registration_status.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly  jwtService: JwtService
    ){}

    async register(createUserDTO:CreateUserDTO): Promise<IRegistrationStatus>{
        let status: IRegistrationStatus = {
            success: true,
            message: 'usuario registrado'
        };

        try {
            await this.userService.createUser(createUserDTO)
        }catch(err){
            status = {
                success: false,
                message:   err
            }
        }
        return status;
    }

    //Metodo Login
    async login(loginUserDTO:LoginUserDTO): Promise<IloginStatus>{
        const user = await this.userService.findByLogin(loginUserDTO);
        const expireIn = process.env.EXPIRES_IN;
        const accessToken = this.jwtService.sign(user);

        let token: IloginStatus = {
            email: user.email,
            expireIn: expireIn,
            accessToken: accessToken
        }
        return token ;
    }

    //Metodo para validación de usuario

    async validateUser(payload: IJWTPayload ): Promise<UserDTO>{
        const user = await this.userService.findByPayload(payload);
        if(!user){
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        return user; 
    }
}
