import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./users.entity";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./jwt/jwt.strategy";
import {PassportModule} from "@nestjs/passport";

@Module({
  imports: [
      TypeOrmModule.forFeature([UserEntity]),
      PassportModule.register({defaultStrategy: 'jwt', session:true}),
        JwtModule.register({
        secret: process.env.SECRET_KEY,
        secretOrPrivateKey:process.env.SECRET_KEY,
        signOptions: { expiresIn : ' 1d' }
        })
    ],
  controllers: [UsersController],
  providers: [JwtStrategy, UsersService],
  exports:[UsersService]
})
export class UsersModule {}
