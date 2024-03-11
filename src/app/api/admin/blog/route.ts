import {NextResponse} from "next/server";

export const POST = async (request: Request) => {
    const data = await request.formData();
    try {
        return NextResponse.json({ data:data.get('data') });
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}
export const config = {
    api: {
        bodyParser: false,
    },
};