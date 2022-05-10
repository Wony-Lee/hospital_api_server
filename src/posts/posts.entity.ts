import {Column, Entity, Index} from "typeorm";
import {CommonEntity} from "../common/entities/common.entity";
import {IsNotEmpty, IsNumber, IsPhoneNumber, IsString} from "class-validator";


@Index('hospitalName', ['hospitalName'], {unique:true})
@Entity({
    name:"POST"
})

export class PostsEntity extends  CommonEntity {
    @IsString()
    @IsNotEmpty()
    @Column({ type: 'varchar', unique: true, nullable: false })
    hospitalName:string

    @IsString()
    @IsNotEmpty({ message: '주소를 입력해주세요.' })
    @Column({ type: 'varchar', nullable: true })
    address:string

    @IsPhoneNumber()
    @Column({ type:'int', nullable:false})
    phoneNumber:number

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
}
