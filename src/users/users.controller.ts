import {Body, Controller, Get, Logger, Post, Res, UseGuards, UseInterceptors} from '@nestjs/common';
import {UserEntity} from "./users.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UsersService} from "./users.service";
import {UserRegisterDTO} from "./dtos/user-register.dto";
import {UserLoginDTO} from "./dtos/user-login.dto";
import {Response} from "express";
import {JwtAuthGuard} from "./jwt/jwt.guard";
import {OnlyPrivateInterceptor} from "../common/interceptors/only-private.interceptor";
import {CurrentUser} from "../common/decorators/current-user.decotator";
import {UserDTO} from "./dtos/user.dto";

@Controller('users')
export class UsersController {
    private readonly logger = new Logger(UsersController.name)


    constructor(
        private readonly userService:UsersService,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    // @Get()
    // @UseGuards(JwtAuthGuard)
    // @UseInterceptors(OnlyPrivateInterceptor)
    // async getCurrentUser(@CurrentUser() currentUser: UserDTO) {
    //     return currentUser
    // }

    @Post('signUp')
    async signup(@Body() userRegisterDTO: UserRegisterDTO) {
        return await this.userService.registerUser(userRegisterDTO)
    }

    @Post('login')
    async logIn(
        @Body() userLoginDTO: UserLoginDTO,
        @Res({ passthrough: true }) response:Response
    ) {
       const { jwt, user } = await this.userService.verifyUserAndSignJwt(
           userLoginDTO.email,
           userLoginDTO.password
       )
        response.cookie('jwt', jwt, { httpOnly: true })
        return user
    }

    @Post('logout')
    async logOut(@Res({passthrough: true}) response:Response) {
        response.clearCookie('jwt')
    }
}
