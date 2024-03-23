import {NextRequest, NextResponse} from "next/server";
import {getLikes, toggleLike} from "~/service/server.service";



export const GET = async (req: NextRequest) => {

    try {
        const id=req.nextUrl.searchParams.get('id')!
      const likes=  await getLikes(parseInt(id))

        return NextResponse.json({likes}, {status: 200})
    }catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}
