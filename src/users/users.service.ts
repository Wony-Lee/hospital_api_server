import {BadRequestException, Injectable, Logger, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./users.entity";
import {Repository} from "typeorm";
import {ConfigService} from "@nestjs/config";
import {UserRegisterDTO} from "./dtos/user-register.dto";
import * as bcrypt from 'bcrypt'
import {JwtService} from "@nestjs/jwt";
import {UserLoginDTO} from "./dtos/user-login.dto";
import {UserDTO} from "./dtos/user.dto";

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name)

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    async findUserById(id: string) {
        try {
            const user = await this.userRepository.findOne({id})
            if(!user) throw new Error()
        } catch(error) {
            throw new BadRequestException('해당하는 사용자를 찾을 수 없습니다.')
        }
    }

    async verifyUserAndSignJwt(
        email:UserLoginDTO['email'],
        password:UserLoginDTO['password']):Promise<{jwt: string; user:UserDTO}>
    {
        const user = await this.userRepository.findOne({email})
        if(!user) {
            throw new UnauthorizedException('해당하는 이메일이 존재하지 않습니다.')
        }
        if(!(await bcrypt.compare(password, user.password))) throw new UnauthorizedException('로그인에 실패했습니다.')
        try {

            const jwt = await this.jwtService.signAsync(
                { sub: user.id },
                { secret : this.configService.get("SECRET_KEY") }
            )
            return { jwt, user }
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    async registerUser(userRegisterDTO: UserRegisterDTO):Promise<void> {
        const { email, password } = userRegisterDTO
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
