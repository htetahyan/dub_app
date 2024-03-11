import {NextResponse} from "next/server";

export const notFound = (message: string) => {
    const localTime = new Date();
    // Format the date and time as a string
    const timeString = localTime.toLocaleString('en-US', {timeZone: 'Asia/Yangon'});
    return  NextResponse.json({message: message,success:false,time:timeString}, {status: 404});
}