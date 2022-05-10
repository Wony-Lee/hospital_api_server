import {Injectable, Logger} from '@nestjs/common';
import {PostsEntity} from "./posts.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {PostsDTO} from "./dtos/posts.dto";

@Injectable()
export class PostsService {
    private readonly logger = new Logger(PostsService.name)

    constructor(
        @InjectRepository(PostsEntity)
        private readonly postsRepository: Repository<PostsEntity>
    ) {}

    async findAllPosts() {
        const result = await this.postsRepository.find()
        return result
    }

    async createPosts(postsDTO: PostsDTO): Promise<void> {
        const { hospitalName, address, phoneNumber, category } = postsDTO
        if(!hospitalName) throw new Error();
        console.log(hospitalName)
    }

}
