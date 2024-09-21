import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession } from "~/service/payment.service";
import { getCurrentUser } from "~/service/user.service";
import {revalidateTag} from "next/cache";

export const POST= async(request:NextRequest)=>{
    const accessToken=request.cookies.get('access_token')?.value
    const user = await getCurrentUser(accessToken)    
    if(!user) return NextResponse.json({message:"Plase sign in first before buy a plan"},{status:400})
const {priceId,price}=await request.json()
    try {
        const session=await createCheckoutSession(user,priceId,price)
        revalidateTag('profile')
        revalidateTag('user')

        return NextResponse.json({url:session.url}, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Something went wrong"},{status:500})
    }
    
}