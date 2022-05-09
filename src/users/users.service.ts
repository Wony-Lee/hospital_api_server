import {Injectable, Logger, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./users.entity";
import {Repository} from "typeorm";
import {ConfigService} from "@nestjs/config";
import {UserRegisterDTO} from "./dtos/user-register.dto";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name)

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly configService: ConfigService
    ) {}

    async registerUser(userRegisterDTO: UserRegisterDTO):Promise<void> {

        const {email, password} = userRegisterDTO
        console.log('email, password',email,password)
        const user = await this.userRepository.findOne({email})
        if(user) {
            throw new UnauthorizedException('이미 존재하는 이메일 입니다.')
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        await this.userRepository.save({
            ...userRegisterDTO,
            password:hashedPassword
        })

    }

}
