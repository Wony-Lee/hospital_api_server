import {Body, Controller, Get, Logger, Post} from '@nestjs/common';
import {UserEntity} from "./users.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UsersService} from "./users.service";
import {UserRegisterDTO} from "./dtos/user-register.dto";

@Controller('users')
export class UsersController {
    private readonly logger = new Logger(UsersController.name)


    constructor(
        private readonly userService:UsersService,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    @Get()
    async getCurrentUser() { return "Hello User" }

    @Post('signUp')
    async signup(@Body() userRegisterDTO: UserRegisterDTO) {
        return await this.userService.registerUser(userRegisterDTO)
    }


}
