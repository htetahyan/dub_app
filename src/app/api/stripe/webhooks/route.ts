import { revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server"
import { CreateWebhookStripe } from "~/service/payment.service";

export const POST = async (request: NextRequest) => {
    const body = await request.text();
    const signature = headers().get("Stripe-Signature");
    
    if (!signature)
        return  NextResponse.json({message:"Missing Stripe Signature"}, { status: 400 });
    try {
        const wh=await CreateWebhookStripe(signature, body)
        console.log(wh);
        revalidateTag('profile')
        revalidateTag('user')
        return NextResponse.json({message:"success"}, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Something went wrong"},{status:500})
    }
    
}