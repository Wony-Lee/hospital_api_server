import {CommonEntity} from "../common/entities/common.entity";
import {Column, Entity, Index} from "typeorm";
import {IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString} from "class-validator";
import {Exclude} from "class-transformer";

@Index('email', ['email'], {unique:true})
@Entity({
    name:'USER',
})
export class UserEntity extends CommonEntity {
    @IsEmail({}, {message: '올바른 이메일을 작성해주세요.'})
    @IsNotEmpty({message:'이메일을 작성해주세요.'})
    @Column({type:'varchar', unique: true, nullable: false})
    email:string

    @IsString()
    @IsNotEmpty({message : '이름을 작성해주세요.'})
    @Column({type:'varchar', nullable:false})
    username:string

    @Exclude()
    @Column({type : 'varchar', nullable : false})
    password:string

    @IsPhoneNumber()
    @Column({type:'int', nullable:false})
    phoneNumber:number

    @IsString()
    @Column({type:'varchar', nullable:false})
    address:string

    @IsBoolean()
    @Column({type : 'boolean', default: false})
    isAdmin:boolean
}
