import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule, TypeOrmModuleOptions} from "@nestjs/typeorm";
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import {ConfigModule, ConfigService} from '@nestjs/config'
import { UsersModule } from './users/users.module';
import * as Joi from "joi";
import {UserEntity} from "./users/users.entity";
import { PostsModule } from './posts/posts.module';
import {PostsEntity} from "./posts/posts.entity";


const typeOrmModuleOptions = {
    useFactory: async (
        configService: ConfigService,
    ): Promise<TypeOrmModuleOptions> => ({
        namingStrategy: new SnakeNamingStrategy(),
        type:'mysql',
        host:configService.get('DB_HOST'),
        port:configService.get('DB_PORT'),
        username:configService.get('DB_USERNAME'),
        password:configService.get('DB_PASSWORD'),
        database:configService.get("DB_DATABASE"),
        entities:[UserEntity,PostsEntity],
        synchronize:true, // set 'false' in production // 후에 마이그레이션 해서 사용
        timezone: 'local',
        autoLoadEntities:true,
        logging:true,
        keepConnectionAlive:true, // 연결할때까지 시도
    }),
    inject:[ConfigService],
}

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal:true,
          validationSchema:Joi.object({
              NODE_ENV:Joi.string()
                  .valid('development', 'production', 'test', 'provision')
                  .default('development'),
              PORT:Joi.number().default(8080),
              SECRET_KEY:Joi.string().required(),
              DB_USERNAME: Joi.string().required(),
              DB_PASSWORD:Joi.string().required(),
              DB_HOST:Joi.string().required(),
              DB_PORT:Joi.number().required(),
              DB_DATABASE:Joi.string().required()
          })
      }),
      TypeOrmModule.forRootAsync(typeOrmModuleOptions),
      UsersModule,
      PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
