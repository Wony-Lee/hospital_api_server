import {PickType} from "@nestjs/swagger";
import {PostsEntity} from "../posts.entity";
import {IsNotEmpty, IsPhoneNumber, IsString} from "class-validator";


export class PostsDTO extends PickType(PostsEntity, ['hospitalName', 'address', 'phoneNumber', 'category']){
    @IsString()
    @IsNotEmpty({message : '병원명을 입력해주세요.'})
    hospitalName:string

    @IsString()
    @IsNotEmpty({message: '병원 주소를 입력해주세요.'})
    address:string

    @IsPhoneNumber()
    @IsNotEmpty({message: '병원 연락처를 입력해주세요.'})
    phoneNumber:number

    @IsString()
    @IsNotEmpty({message: '진료과목을 입력해주세요.'})
    category: string;
}
