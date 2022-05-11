import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PostsEntity} from "./posts.entity";
import {UsersService} from "../users/users.service";
import {MulterModule} from "@nestjs/platform-express";
import {VisitorEntity} from "../common/visitor/visitor.entity";

@Module({
  imports:[
      MulterModule.register({
        dest:'./upload'
      }),
    TypeOrmModule.forFeature([PostsEntity]),
  ],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
