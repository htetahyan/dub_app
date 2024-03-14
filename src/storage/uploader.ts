import cloudinary from "~/storage/cloudinary";
import { postFormData } from "~/service/api.service";

interface CloudinaryUploadResult {
    public_id: string;
    version: number;
    signature: string;
    width: number;
    height: number;
    format: string;
    resource_type: string;
    created_at: string;
    bytes: number;
    type: string;
    url: string;
    secure_url: string;
    // Add other fields as needed based on your specific use case
}

export const uploadImage = async (formData: FormData) => {
    'use server'
    const file = formData.get('image') as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    try {
        const { url } = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
            cloudinary.uploader.upload_stream({
                upload_preset: 'flashCard'
            }, function (error, result) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result as CloudinaryUploadResult);
            }).end(buffer);
        });


            return await postFormData(url, formData);

    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}
