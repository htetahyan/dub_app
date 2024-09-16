import {ElevenLabsClient} from "elevenlabs";

const elevenLabsClient = new ElevenLabsClient({
    apiKey: process.env.ELEVENLABS_API_KEY as string,
});
const BASE_URL = "https://api.elevenlabs.io/v1";

export const newDubbing = async (
    file: File | null,
    name: string,
    source_url: string | null,
    source_lang: string,
    target_lang: string,
    nums_speakers: number,
    start_time: number,
    end_time: number
) => {
    try {
        const requestData: any = {
            name: name,
            source_lang: 'en',
            target_lang: 'de',
            num_speakers: nums_speakers,
            start_time: start_time,
            end_time: end_time,
            watermark: true,
            highest_resolution: false,
        };

        if (file) {
            requestData.file = file;
        } else if (source_url) {
            requestData.source_url = source_url;
        } else {
            throw new Error("Either a file or a source URL must be provided.");
        }

        const response = await elevenLabsClient.dubbing.dubAVideoOrAnAudioFile(requestData);
        return response;
    } catch (e) {
        throw new Error("Failed: " + e);
    }
};
export const getVideoFromId = async (id: string) => {
    const res = await fetch(`${BASE_URL}/dubbing/${id}/audio/de`, {
        headers: {
            "xi-api-key": process.env.ELEVENLABS_API_KEY as string,
        },
    });

    if (!res.ok) {
        console.error('Error fetching the video:', res.statusText);
        return;
    }

    const arrayBuffer = await res.arrayBuffer();
    const blob =  new Blob([arrayBuffer], { type: 'video/mp4' });
    // Return the Blob URL
    console.log(blob)
    return blob;
};
