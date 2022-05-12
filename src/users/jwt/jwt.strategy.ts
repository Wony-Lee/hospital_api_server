import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {UsersService} from "../users.service";
import {ExtractJwt, Strategy} from "passport-jwt";
import {jwtExtractorFromCookies} from "../../common/utils/jwtExtractorFromCookies";
import {ConfigService} from "@nestjs/config";
import {JwtPayload} from "./jwt.payload";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService,
                private readonly configService: ConfigService
                ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([jwtExtractorFromCookies]),
            secretOrKey: configService.get('SECRET_KEY'),
            ignoreExpiration:false,
        })
    }

    async validate(payload: JwtPayload) {
        try {
            const user = await this.usersService.findUserById(payload.sub)
            // @ts-ignore
            if (user) {
                return user;
            } else {
                throw new Error('존재하지 않는 유저 입니다.')
            }
        } catch (error) {
            throw new UnauthorizedException(error)
        }
    }
}
