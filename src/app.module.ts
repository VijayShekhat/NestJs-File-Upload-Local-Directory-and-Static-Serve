import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import path, { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot(
      {
        rootPath: join(__dirname, '..', 'uploads'), // Correctly point to the uploads folder
        serveRoot: '/uploads/', // URL path prefix
      },
    ),
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'yourDBPassword',
      database: 'file-uploads',
      entities: [User],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
