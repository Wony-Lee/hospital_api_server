import {IsUUID} from "class-validator";
import {CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Exclude} from "class-transformer";

export abstract  class CommonEntity {
    @IsUUID()
    @PrimaryGeneratedColumn('uuid')
    id:string

    // 해당 열이 추가된 시각을 자동으로 기록
    @CreateDateColumn({
        type:'datetime'
    })
    createAt:Date

    @UpdateDateColumn({type:'datetime'})
    updateAt:Date

    // Soft Delete : 기존에는 null, 삭제시에 timestamp를 찍는다.
    @Exclude()
    @DeleteDateColumn({type:'datetime'})
    deleteAt?:Date | null
}
