import {JwtFromRequestFunction} from "passport-jwt";
import {Request} from "express";


export const jwtExtractorFromCookies: JwtFromRequestFunction = (
    request: Request,
): string | null => {
    try {
        const jwt = request.cookies['jwt']
        return jwt
    } catch (error) {
        return null
    }
}
