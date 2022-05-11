import {Injectable, Logger} from '@nestjs/common';
import {PostsEntity} from "./posts.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {PostsDTO} from "./dtos/posts.dto";
import {validationCheck} from "../common/utils/validationCheck";


@Injectable()
export class PostsService {
    private readonly logger = new Logger(PostsService.name)

    constructor(
        @InjectRepository(PostsEntity)
        private readonly postsRepository: Repository<PostsEntity>,
    ) {}

    async findAllPosts() {
        const result = await this.postsRepository.find()
        return result
    }

    async createPosts(postsDTO: PostsDTO, id:string): Promise<void> {
        const { hospitalName, address, phoneNumber, category } = postsDTO
        console.log('postsDTO =======>', postsDTO)
        validationCheck({ hospitalName, address, phoneNumber, category })
        await this.postsRepository.save({
            ...postsDTO,
            userId:id
        })

    }

    async findByIdAndUpdateImg(hospitalName: string, fileName:string) {
        const post = await this.postsRepository.findOne(hospitalName)
        // console.log('findById fileName => ',fileName)
        // console.log('findById Id =>', hospitalName)
        // console.log('=>',post)
        post.imgUrl = `http://localhost:8000/image/${fileName}`
        if(hospitalName === post.hospitalName) {
            const newPost = await this.postsRepository.save({
                ...post
            })
            return newPost
        }
    }

    async uploadImg(post: PostsEntity, files:Express.Multer.File[]) {
        const fileName = `hospital_state/${files[0].filename}`;
        // console.log(fileName)
        const newFile = await this.findByIdAndUpdateImg(post.hospitalName, fileName)
        return fileName
    }

}

