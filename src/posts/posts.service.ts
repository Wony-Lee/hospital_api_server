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

    async findOnePost(hospitalName: string) {
        const post = await this.postsRepository.findOne(
            { where:
                    { hospitalName: hospitalName }
            }
        )
        return post
        // const post = await this.postsRepository.find()
        // return post.filter(item => item.hospitalName === hospitalName)
    }

    async createPosts(postsDTO: PostsDTO, id:string): Promise<void> {
        const { hospitalName, address, phoneNumber, category } = postsDTO
        validationCheck({ hospitalName, address, phoneNumber, category })
        await this.postsRepository.save({
            ...postsDTO,
            userId:id
        })
    }

    async findByIdAndUpdateImg(hospitalName: string, fileName:string) {
        const post = await this.postsRepository.findOne(hospitalName)

        post.imgUrl = `http://localhost:8000/${fileName}`
        const newPost = await this.postsRepository.save({
            ...post
        })
        return newPost
    }

    async uploadImg(post: PostsEntity, files:Express.Multer.File[]) {
        console.log('upload Img => post',post)
        console.log('upload files => post',files)
        const fileName = `hospital_state/${files[0].filename}`;
        const newFile = await this.findByIdAndUpdateImg(post.hospitalName, fileName)
        return newFile
    }

}

