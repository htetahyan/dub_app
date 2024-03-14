import {v2 as cloudinary} from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    secure: true,
    api_secret: process.env.CLOUDINARY_API_SECRET!,

})


export default cloudinary;