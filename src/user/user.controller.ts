import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDTO } from './dto/create_user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService:UserService){}

    @Get()
    async getUsers(@Res() res){
        const users = await this.userService.getUsers();

        return res.status(HttpStatus.OK).json({
            message: "User Listed",
            data: users
        });
    }


    @Get('/:userId')
    async getUser(@Res() res, @Param('userId') id ){
        const user = await this.userService.getUserByID(id);

        if(!user){
            throw new NotFoundException('Student does not exists');
        }

        return res.status(HttpStatus.OK).json({
            message: 'User found',
            data: user
        });

    }


    @Post('/create')
    async createNewUser(@Res() res, @Body() createUserDTO:CreateUserDTO){
        
        const user = await this.userService.createUser(createUserDTO);

        return res.status(HttpStatus.CREATED).json({
            message: "User Created",
            data: user
        });
    }


    @Put('/update/:userId')
    async updateUser(  @Res() res, @Body() createUserDTO: CreateUserDTO, @Param('userId') id){
        const user = await this.userService.updateUser(id, createUserDTO);

        if(!user){
            throw new NotFoundException('User does not exists');
        }

        return res.status(HttpStatus.OK).json({
            message: 'User updated',
            data: user
        });
    }

    @Delete('/:userId')
    async deleteUser(@Res() res, @Param('userId') id){

        const user = await this.userService.deleteUser(id);

        if(!user){
            throw new NotFoundException('User does not exists');
        }

        return res.status(HttpStatus.OK).json({
            message: 'User deleted',
            data: user
        });
    }
}