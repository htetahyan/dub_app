import { NextRequest, NextResponse } from "next/server"
import { listVoices } from "~/utils/AzureSpeechApi";

export const GET = async (request: NextRequest) => {
 try {  const voices= await listVoices();
     const shornames= voices.privVoices.map((voice)=> voice.privShortName)
    return NextResponse.json({message: shornames}, {status: 200})
    
 } catch (error) {
    return NextResponse.json({message: error}, {status: 500})
 } 
}