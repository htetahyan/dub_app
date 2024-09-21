import {NextResponse} from "next/server";
import {cookies} from "next/headers";
import {revalidateTag} from "next/cache";

export const POST = async (request: Request) => {
    try {
        cookies().delete('access_token')
        cookies().delete('rt')
        revalidateTag('profile')
        revalidateTag('user')

return NextResponse.json({message:"Logout success..."},{status:200})
    }catch (e) {
        return NextResponse.json({message: 'failed'}, {status: 400});
    }
}
