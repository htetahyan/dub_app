import 'server-only'
import {ResponseCookie} from "next/dist/compiled/@edge-runtime/cookies";
import {decodeJwt, jwtVerify, SignJWT} from "jose";
import {cache} from "react";

const ACCESS_TOKEN_LIFE = Math.floor(Date.now() / 1000) + (60 * 60); // 1 day
const REFRESH_TOKEN_LIFE = Math.floor(Date.now() / 1000) + (60 * 60*24); // 30 days
const generateUnit8Array = (secret: string) => {
  return  Uint8Array.from(Buffer.from(secret,'base64'));
}
export const generateAccessToken = async (payload: any) => {
    console.log(payload)
    return await new SignJWT(payload).setSubject(payload.id)
        .setProtectedHeader({
            alg: "HS256",
            typ: "JWT",
        })

        .setExpirationTime(ACCESS_TOKEN_LIFE).sign(generateUnit8Array(process.env.JWT_SECRET!));
}
export const generateRefreshToken = async (payload: any) => {
    return await new SignJWT(payload).setSubject(payload.id)
        .setProtectedHeader({
            alg: "HS256",
            typ: "JWT",
        })
        .setExpirationTime(REFRESH_TOKEN_LIFE).sign(generateUnit8Array(process.env.JWT_SECRET!));
}

export const verifyToken =  async(token: string) => {
    if(!token) return false
    try {
        const payload = await jwtVerify(token, generateUnit8Array(process.env.JWT_SECRET!), {
            algorithms: ['HS256'],
        });
        return !!payload;
    } catch (err) {

        // @ts-ignore
        return err.message;
    }
};
export const decodeJWTToken = async (token: string) => {
    return decodeJwt(token);
};
export const extractUserIdFromToken = async (token: string) : Promise<number | undefined> => {
    const payload = await decodeJWTToken(token);
    return parseInt(<string>payload.sub)
}

export const cookieOptions :Partial<ResponseCookie> | undefined = {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
    domain: process.env.NODE_ENV === "production" ? ".dev-blogs.vercel.app" : 'localhost',

}
