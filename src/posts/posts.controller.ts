import {Body, Controller, Get, Logger, Post, UseGuards, UseInterceptors} from '@nestjs/common';
import {PostsService} from "./posts.service";
import {InjectRepository} from "@nestjs/typeorm";
import {PostsEntity} from "./posts.entity";
import {Repository} from "typeorm";
import {PostsDTO} from "./dtos/posts.dto";
import {JwtAuthGuard} from "../users/jwt/jwt.guard";
import {OnlyPrivateInterceptor} from "../common/interceptors/only-private.interceptor";
import {CurrentUser} from "../common/decorators/current-user.decotator";
import {UserDTO} from "../users/dtos/user.dto";

@Controller('posts')
export class PostsController {
    private readonly logger = new Logger(PostsController.name)

    constructor(
        private readonly postsService: PostsService,
        @InjectRepository(PostsEntity)
        private readonly postsRepository: Repository<PostsEntity>
    ){}

    @Get()
    async getPosts() {
        return this.postsService.findAllPosts()
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    // @UseInterceptors(OnlyPrivateInterceptor)
    async createPost(@CurrentUser() currentUser: UserDTO, @Body() postsDTO: PostsDTO) {
        console.log('currentUser ========> ',currentUser)
        return this.postsService.createPosts(postsDTO)
    }
}
