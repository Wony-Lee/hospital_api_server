import {Body, Controller, Get, Logger, Post} from '@nestjs/common';
import {PostsService} from "./posts.service";
import {InjectRepository} from "@nestjs/typeorm";
import {PostsEntity} from "./posts.entity";
import {Repository} from "typeorm";
import {PostsDTO} from "./dtos/posts.dto";

@Controller('posts')
export class PostsController {
    private readonly logger = new Logger(PostsController.name)

    constructor(
        private readonly postsService: PostsService,
        @InjectRepository(PostsEntity)
        private readonly postsRepository: Repository<PostsEntity>
    )
    {}


    @Get()
    async getPosts() {
        return this.postsService.findAllPosts()
    }

    @Post()
    async createPost(@Body() postsDTO: PostsDTO) {
        console.log('body Item',postsDTO)
        return this.postsService.createPosts(postsDTO)
    }
}
