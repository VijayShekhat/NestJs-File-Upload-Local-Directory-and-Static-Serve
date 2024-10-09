import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { promises as fs } from 'fs';
import * as path from 'path';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async createUser(userData: Partial<User>, file: Express.Multer.File): Promise<User> {
        const user = this.userRepository.create(userData);
        
        if (file) {
          // Save the relative path or unique name to the user profile
          const domain = process.env.BASE_URL
          console.log(domain)
          user.profilePicture = domain + `uploads/${file.filename}`; // Adjust based on your serving structure
        }
      
        return this.userRepository.save(user);
      }

      async readAll(): Promise<User[]> {
        const users = await this.userRepository.find()
        return users 
      }
}
