import {NestFactory, Reflector} from '@nestjs/core';
import { AppModule } from './app.module';
import {ClassSerializerInterceptor, Logger, ValidationPipe} from "@nestjs/common";
import {NestExpressApplication} from "@nestjs/platform-express";
import * as expressBasicAuth from "express-basic-auth";
import * as passport from "passport";
import * as cookieParser from "cookie-parser";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {HttpApiExceptionFilter} from "./common/exceptions/http-api-exception-filter";
import * as expressSession from 'express-session';
import * as path from "path";


class Application {
  private logger = new Logger(Application.name)
  private DEV_MODE: boolean
  private PORT:string
  private corsOriginList: string[]
  private ADMIN_USER: string
  private ADMIN_PASSWORD: string

  constructor(private server: NestExpressApplication) {
    this.server = server

    if(!process.env.SECRET_KEY) this.logger.error('SET "SECRET" env')
    this.DEV_MODE = process.env.NODE_DEV !== 'production'
    this.PORT = process.env.PORT || '8080'
    this.corsOriginList = process.env.CORS_ORIGIN_LIST
        ? process.env.CORS_ORIGIN_LIST.split(',').map((origin) => origin.trim()) : ['*']
    this.ADMIN_USER = process.env.ADMIN_USER || 'admin'
    this.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'dev-won'
  }

  private setUpBasicAuth() {
    this.server.use(
        ['/docs', '/docs-json'],
        expressBasicAuth({
          challenge: true,
          users: {
            [this.ADMIN_USER]: this.ADMIN_PASSWORD,
          },
        }),
    )
  }

  private setUpOpenAPIMidleware() {
    SwaggerModule.setup(
        'docs',
        this.server,
        SwaggerModule.createDocument(
            this.server,
            new DocumentBuilder()
                .setTitle('Hospital_state - API')
                .setDescription('TypeORM In Nest')
                .setVersion('0.0.1')
                .build(),
        ),
    )
  }

  private async setUpGlobalMiddleware() {
    this.server.enableCors({
      origin: this.corsOriginList,
      credentials: true,
    })
    this.server.use(expressSession({
      secret: process.env.SECRET_KEY, // 시크릿 키
      resave:false, // 세션을 저장하고 불러올 때 세션을 다시 저장할지 여부
      saveUninitialized:true, // 세션에 저장할 때 초기화를 할지에 대한 여부
      cookie: { maxAge: 24000 * 60 * 60 } // 쿠키의 생명 기간, 단위는 ms
    }))
    this.server.use(cookieParser())
    this.setUpBasicAuth()
    this.setUpOpenAPIMidleware()
    this.server.useGlobalPipes(
        new ValidationPipe({
          transform: true,
        }),
    )
    this.server.use(passport.initialize())
    this.server.use(passport.session())
    this.server.useStaticAssets(path.join(__dirname, './common', 'uploads'), {
      prefix: '/image'
    })
    this.server.useGlobalInterceptors(
        new ClassSerializerInterceptor(this.server.get(Reflector)),
    )
    this.server.useGlobalFilters(new HttpApiExceptionFilter())
  }

  async boostrap() {
    await this.setUpGlobalMiddleware()
    await this.server.listen(this.PORT)
  }

  startLog() {
    if (this.DEV_MODE) {
      this.logger.log(`✅ Server on http://localhost:${this.PORT}`)
    } else {
      this.logger.log(`✅ Server on port ${this.PORT}...`)
    }
  }

  errorLog(error: string) {
    this.logger.error(`🆘 Server error ${error}`)
  }


}


async function init(): Promise<void> {
  const server = await NestFactory.create<NestExpressApplication>(AppModule)
  const app = new Application(server)
  await app.boostrap()
  app.startLog()
}

init().catch((error) => {
  new Logger('init').error(error)
})
