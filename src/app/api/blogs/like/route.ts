import {NextRequest, NextResponse} from "next/server";
import {getLikes, toggleLike} from "~/service/server.service";
import {revalidateTag} from "next/cache";
import {cookies} from "next/headers";

export const POST = async (req: NextRequest) => {
    const token=await req.headers.get('Authorization') as string
try {
    const token=req.headers.get('Authorization') as string
const id=req.nextUrl.searchParams.get('id')!
   await toggleLike(parseInt(id),token!)

    return NextResponse.json({message: 'success'}, {status: 200})
}catch (error:any) {
    return NextResponse.json({error: error.message}, {status: 400})
}

}
export const GET = async (req: NextRequest) => {

    try {
        const id=req.nextUrl.searchParams.get('id')!
      const likes=  await getLikes(parseInt(id))

        return NextResponse.json({likes}, {status: 200})
    }catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}
