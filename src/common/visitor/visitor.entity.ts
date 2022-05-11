import {Column, Entity} from "typeorm";
import {CommonEntity} from "../entities/common.entity";
import {IsIP, IsNotEmpty} from "class-validator";


@Entity({
    name:'VISITOR'
})

export class VisitorEntity extends CommonEntity {
    @IsIP()
    @IsNotEmpty()
    @Column({type:'varchar', nullable:false})
    ip:string
    
}
