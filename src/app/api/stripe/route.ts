import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession } from "~/service/payment.service";
import { getCurrentUser } from "~/service/user.service";

export const POST= async(request:NextRequest)=>{
    const user=await getCurrentUser()
    if(!user) redirect(process.env.NEXT_PUBLIC_BASE_URL!+"/signin")
    const priceId = "price_1PyWQmJM8edFj1dH4lKM99go"
    try {
        const session=await createCheckoutSession(user,priceId)
        
        return NextResponse.json({url:session.url}, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Something went wrong"},{status:500})
    }
    
}