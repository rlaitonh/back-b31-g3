import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dto/create_user.dto';
import { LoginUserDTO } from './dto/login_user.dto';
import { UserDTO } from './dto/user.dto';
import { IUser } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel('user') private readonly userModel: Model<IUser> ){}


    async getUsers():Promise<IUser[]>{
        const users = await this.userModel.find();
        return users;
    }

    //busca un usuario y devuelve un dto
    async getUser(options?:object):Promise<UserDTO>{
        const users = await this.userModel.findOne(options);
        return this.userModelToUserDTO(users)
    }    

    async getUserByID(userId: string):Promise<UserDTO>{
        const user = await this.userModel.findById(userId);
        return this.userModelToUserDTO(user);
    }

    async findByLogin(loginUserDTO:LoginUserDTO): Promise <UserDTO>{
        const { email, password} = loginUserDTO;
        const user = await this.userModel.findOne({email}) 
        
        if (!user){
            throw new HttpException('usuario no encontrado', HttpStatus.UNAUTHORIZED)
        }
        const verifyPassword = await bcrypt.compare(password, user.password); 

        if (!verifyPassword){
            throw new HttpException('contraseña invalida', HttpStatus.UNAUTHORIZED)           
        }
        return this.userModelToUserDTO(user);
    }

    // token para validar el  usuario
    async findByPayload({email}: any): Promise<UserDTO>{
        const user =  await this.getUser({where: {email}});
        return user;
    }

    
    async createUser( createUserDTO: CreateUserDTO): Promise <UserDTO>{
        const {email, firstname, lastname, password, role } = createUserDTO;
        
        const foundUser = await this.userModel.findOne({email});
        
        if(foundUser){
            throw new HttpException('el usuario ya existe', HttpStatus.BAD_REQUEST);
        }
        const user = await this.userModel.create({firstname, lastname, password, email, role});
        await user.save();
        return this.userModelToUserDTO(user);
    }

    async updateUser(userId: string, createUserDTO: CreateUserDTO):Promise<IUser>{
        const updatedUser = await this.userModel.findByIdAndUpdate(userId, createUserDTO, { new: true} );
        return updatedUser;
    }

    async deleteUser(userId: string):Promise<IUser>{
        const deletedUser = await this.userModel.findByIdAndDelete(userId);
        return deletedUser;
    }

    // mapper es una funcion que va a tomar el user model y convertirlo a DTO o viceversa si se necesita:    
    userModelToUserDTO(model: IUser ): UserDTO{
        const {firstname, lastname, email, state, role} = model; 
        let userDTO : UserDTO = {firstname, lastname, email, state, role};
        return userDTO;     
    }

}




