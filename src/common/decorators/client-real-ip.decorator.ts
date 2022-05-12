import * as requestIp from 'request-ip'
import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {Request} from "express";

export const ClientIp = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request : Request = ctx.switchToHttp().getRequest()
        if(request.headers['cf-connecting-ip'])
            return request.headers['cf-connecting-i[']
        else return requestIp.getClientIp(request)
    }
)
