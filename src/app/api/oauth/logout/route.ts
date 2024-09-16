import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (res:NextRequest) => {
    try {
    cookies().delete("access_token");
    cookies().delete("rt");

    return  NextResponse.json({message:'success'} , { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:'something went wrong when logging out'}, { status: 500 });
    }
}