import {
    Body,
    Controller,
    Get,
    Logger, Param,
    Post,
    UploadedFile,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {PostsService} from "./posts.service";
import {InjectRepository} from "@nestjs/typeorm";
import {PostsEntity} from "./posts.entity";
import {Repository} from "typeorm";
import {PostsDTO} from "./dtos/posts.dto";
import {JwtAuthGuard} from "../users/jwt/jwt.guard";
import {OnlyPrivateInterceptor} from "../common/interceptors/only-private.interceptor";
import {CurrentUser} from "../common/decorators/current-user.decotator";
import {UserDTO} from "../users/dtos/user.dto";
import {FilesInterceptor} from "@nestjs/platform-express";
import {multerOptions} from "../common/utils/multer.options";
import {ClientIp} from "../common/decorators/client-real-ip.decorator";
import {VisitorEntity} from "../common/visitor/visitor.entity";

@Controller('posts')
export class PostsController {
    private readonly logger = new Logger(PostsController.name)

    constructor(
        private readonly postsService: PostsService,
        @InjectRepository(PostsEntity)
        private readonly postsRepository: Repository<PostsEntity>
    ){}

    @Get(':hospitalName')
    async getPost(@Param('hospitalName') hospitalName) {
        return this.postsService.findOnePost(hospitalName)
    }

    @Get()
    async getPosts() {
        return this.postsService.findAllPosts()
    }

    @Post("upload")
    @UseInterceptors(FilesInterceptor('image', 10, multerOptions('hospital_state')))
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(OnlyPrivateInterceptor)
    async uploadImages(
        @UploadedFiles() files: Array<Express.Multer.File>,
        @CurrentUser() post: PostsEntity
    ) {

        return this.postsService.uploadImg(post, files)
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(OnlyPrivateInterceptor)
    async createPost(
        @ClientIp() visitor: VisitorEntity,
        @CurrentUser() currentUser: UserDTO,
        @Body() postsDTO: PostsDTO
    ) {
        return this.postsService.createPosts(postsDTO,currentUser.id)
    }
}
