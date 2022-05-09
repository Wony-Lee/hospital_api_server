import {PickType} from "@nestjs/swagger";
import {UserEntity} from "../users.entity";
import {IsNotEmpty, IsString} from "class-validator";


export class UserRegisterDTO extends PickType(UserEntity, ['email', 'username'] as const ) {
    @IsString()
    @IsNotEmpty({ message : '비밀번호를 작성해주세요.' })
    password:string;
}
