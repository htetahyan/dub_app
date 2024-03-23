import {NextRequest, NextResponse} from "next/server";
import {getBlogs} from "~/service/server.service";

export  async function GET(request: NextRequest) {
    try {
    const limit= parseInt(request.nextUrl.searchParams.get('limit')! )
    const offset=parseInt(request.nextUrl.searchParams.get('offset')!)
    const response = await getBlogs(limit,offset)
    return NextResponse.json(response, {status: 200,headers: { 'Content-Type': 'application/json' ,
        'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
            'keep-alive': 'timeout=10000, max=100000',
        }})
    }catch (error :any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }



}
