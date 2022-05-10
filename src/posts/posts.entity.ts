import {Column, Entity, Index, JoinColumn, ManyToOne, OneToOne} from "typeorm";
import {CommonEntity} from "../common/entities/common.entity";
import {IsNotEmpty, IsNumber, IsPhoneNumber, IsString} from "class-validator";
import {UserEntity} from "../users/users.entity";
import {ApiProperty} from "@nestjs/swagger";


@Index('hospitalName', ['hospitalName'], {unique:true})
@Entity({
    name:"POST"
})

export class PostsEntity extends  CommonEntity {
    @ApiProperty(
        {
            example:"서울 OO병원",
            description:"병원 이름",
            required:true
        }
    )
    @IsString()
    @IsNotEmpty()
    @Column({ type: 'varchar', unique: true, nullable: false })
    hospitalName:string

    @ApiProperty({
        example:"서울 동대문구 OO동",
        description:"병원 주소",
        required:true
    })
    @IsString()
    @IsNotEmpty({ message: '주소를 입력해주세요.' })
    @Column({ type: 'varchar', nullable: true })
    address:string

    @ApiProperty({
        example:"01022223333",
        description:"병원 연락처",
        required:true
    })
    @IsPhoneNumber('KR')
    @Column({ type:'int', nullable:false})
    phoneNumber:number

    @ApiProperty({
        example:"소아과",
        description:"진료과목",
        required:true
    })
    @IsString()
    @IsNotEmpty({ message: '진료과목을 입력해주세요.' })
    @Column({ type:'varchar', nullable: false })
    category: string

    @IsString()
    @Column({ type:'varchar', nullable: true })
    doctor: string

    @IsString()
    @Column( { type:'varchar', nullable: true })
    patientState: string

    @ManyToOne(() => UserEntity, (author: UserEntity) => author.posts, {
        onDelete:'CASCADE', // 사용자가 삭제되면 포스트도 삭제된다.
    })
    @JoinColumn([
        {
            name:'author_id', // db 에 저장되는 필드이름
            referencedColumnName:'id' // user의 id
        }
    ])
    author: UserEntity
}
