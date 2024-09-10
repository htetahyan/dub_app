import { NextRequest, NextResponse } from "next/server";
import { listAvailableVoices } from "~/utils/AzureSpeechApi";
export const dynamic = "force-dynamic";
export const GET = async (req: NextRequest) => {
    const voice =req.nextUrl.searchParams.get('voice')!
    const targetLanguage =req.nextUrl.searchParams.get('targetLanguage')!
    try {
        // Fetch the audio data (which is an ArrayBuffer)
        const audioBuffer = await listAvailableVoices(voice,targetLanguage);

        // Check if audioBuffer is valid by using byteLength for ArrayBuffer
        if (!audioBuffer || !audioBuffer.byteLength) {
            throw new Error("Audio buffer is undefined or empty.");
        }

        // Send raw audio data as a response
        return new NextResponse(audioBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'audio/wav',
                'Content-Length': audioBuffer.byteLength.toString(), // Use byteLength instead of length
            },
        });
    } catch (e: any) {
        console.error("Error in GET request:", e);
        return NextResponse.json({ message: e.message || 'An error occurred' }, { status: 400 });
    }
};
