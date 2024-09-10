import {NextRequest, NextResponse} from "next/server";



export const GET = async (req: NextRequest) => {

    try {
        const id=req.nextUrl.searchParams.get('id')!
  

        return NextResponse.json({}, {status: 200})
    }catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}
