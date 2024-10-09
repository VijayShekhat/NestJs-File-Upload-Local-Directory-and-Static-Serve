import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs/promises'; // Use promises for async handling
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from './entities/user.entity';

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../uploads');
    // Create the directory if it doesn't exist
    fs.mkdir(uploadPath, { recursive: true }) // Make sure to await this if using promises
      .then(() => cb(null, uploadPath))
      .catch(err => cb(err,'failed to create directory.'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Save with unique name
  },
});

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UseInterceptors(FileInterceptor('profilePicture', { storage })) // Use custom storage
  async create(@Body() userData: Partial<User>, @UploadedFile() file: Express.Multer.File): Promise<User> {
    // Check if file is defined
    if (!file) {
      throw new Error('File upload failed');
    }
    
    // Call the service to create the user with the file
    return this.userService.createUser(userData, file);
  }
}
