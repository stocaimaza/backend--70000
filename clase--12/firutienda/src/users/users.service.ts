import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

//1) Importamos: 
//Vamos a importar el decorado @InjectModel
import { InjectModel } from '@nestjs/mongoose';
//Importamos Model de Mongoose: 
import { Model } from 'mongoose';
//Importamos el User y el userSchema.
import {User, userSchema, UsersDocument} from "./schema/users.schema"; 

@Injectable()
export class UsersService {
  //2) Creamos el constructor. hacemos la inyección del nombre del modelo del usuario. 

  constructor(@InjectModel(User.name) private userModel: Model<UsersDocument>) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userModel.create(createUserDto);
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, UpdateUserDto);
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }
}
