import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDTO } from 'src/user/dto/create_user.dto';
import { LoginUserDTO } from 'src/user/dto/login_user.dto';
import { AuthService } from './auth.service';
import { IJWTPayload } from './interfaces/jwt.payload.interface';
import { IloginStatus } from './interfaces/login_status.interface';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}
    @Post('register')
    @UsePipes(new ValidationPipe())
    public async register( @Body() createUserDTO:CreateUserDTO ){
        const result = await this.authService.register(createUserDTO);

        if(!result.success){
            throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
        }
        return result;
    }
    @Post('login')
   // @UsePipes(new ValidationPipe())
    public async login (@Body() loginUserDTO:LoginUserDTO):Promise<IloginStatus>{
        const result:IloginStatus = await this.authService.login(loginUserDTO);
        return result; 
    }

    @Get('identify')
    @UseGuards(AuthGuard())
    public async testAuth(@Req() req: any):Promise<IJWTPayload>{
        return req.user;
    }
}
