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