import {CommonEntity} from "../common/entities/common.entity";
import {Column, Entity, Index, JoinColumn, OneToMany, OneToOne} from "typeorm";
import {IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString} from "class-validator";
import {Exclude} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";
import {PostsDTO} from "../posts/dtos/posts.dto";
import {PostsEntity} from "../posts/posts.entity";

@Index('email', ['email'], {unique:true})
@Entity({
    name:'USER',
})
export class UserEntity extends CommonEntity {
    @ApiProperty({
        example:"hello@world.com",
        description:"email",
        required:true
    })
    @IsEmail({}, {message: '올바른 이메일을 작성해주세요.'})
    @IsNotEmpty({message:'이메일을 작성해주세요.'})
    @Column({type:'varchar', unique: true, nullable: false})
    email:string

    @ApiProperty({
        example:"홍길동",
        description:"username",
        required: true
    })
    @IsString()
    @IsNotEmpty({message : '이름을 작성해주세요.'})
    @Column({type:'varchar', nullable:false})
    username:string

    @ApiProperty({
        example:"1234",
        description:"password",
        required: true
    })
    @Exclude()
    @Column({type : 'varchar', nullable : false})
    password:string

    @ApiProperty({
        example:"01011112222",
        description:"phoneNumber",
        required: true
    })
    @IsPhoneNumber('KR') // 국가코드
    @Column({type:'int', nullable:false})
    phoneNumber:number

    @ApiProperty({
        example:"서울 동대문구 OOO",
        description:"address",
        required:true
    })
    @IsString()
    @Column({type:'varchar', nullable:false})
    address:string

    @IsBoolean()
    @Column({type : 'boolean', default: false})
    isAdmin:boolean

    @OneToOne(() => PostsEntity)
    @JoinColumn({name : 'post_id', referencedColumnName: 'hospitalName'})
    post: PostsEntity

    @OneToMany(() => PostsEntity, (post: PostsEntity) => post.author, {
        cascade: true,
    })
    posts:PostsEntity[]
}
