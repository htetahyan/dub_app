/*
import {eq} from "drizzle-orm/sql/expressions/conditions";



export const findExistORCreateUser = async (email: string,name: string,picture:string):Promise<NewUser> => {
try {
    const res = await db?.select().from(users).where(eq(users.email, email))
if(res!.length>0){
    return res![0]
}else{
const user: NewUser = {
    email,
    password: '',
    provider: 'google',
    name,
    photo: picture
}
await db?.insert(users).values(user)
 return await findExistORCreateUser(email,name,picture)

}}
catch (e:any) {
    throw new Error("Failed to "+e.message)
    
}

}

export const logout =  async () => {
try {
    const res = await fetch('/api/logout', {method: 'POST'});
}catch (e) {
    throw new Error("Failed to (Auth)")
}
}

*/
import {prisma} from "~/utils/utils";
import {toast} from "sonner";
import { cookies } from "next/headers";
import { extractUserIdFromToken, verifyToken } from "./jwt.service";
import { unstable_cache } from "next/cache";
export const findExistORCreateUserGoogle = async (email: string, name: string, picture:string) => {
const existedUser= await prisma.user.findFirst({where:{email}})
    if (existedUser) return existedUser

    const user = {
        email,
        password: '',
        provider: 'google',
createdAt:new Date(),
        isEmailVerified: true,
    

        name,
        credits:10,

        emailVerifToken: '',
        emailHash: '',

        picture
    }

    const newUser = await prisma.user.create({data: user});
return newUser
}
export const verifyEmail = async () => {
    try {
       const res = await fetch('/api/oauth/email', {method: 'POST'}).then(r => r.json())
toast.success(res.message)

    }catch (e) {
        throw new Error("Failed to (Auth)")
    }

}
export const getCurrentUser = async () => {
 const token=cookies().get('access_token')?.value
    if(!token) return null
 const isTokenLegit=await verifyToken(token as string)
if(!isTokenLegit) return null
  const id= await extractUserIdFromToken(token as string)
    const user = await prisma.user.findUnique({where: {id}})
    if(!user) return null
 

    return user
}