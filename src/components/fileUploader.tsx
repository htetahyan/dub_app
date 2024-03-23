
//Todo upload image to cloudinary and save url to database
/*import {postFormData} from "~/service/server.service";
import {Button} from "~/components/Button";

import {uploadImage} from "~/storage/uploader";


const FileUploader = () => {
    async function create(formData: FormData) {
        'use server'
        try {


            await uploadImage(formData);


        } catch (e) {
            console.log(e)
        }
        return (
            <form action={create} className="bg-white border border-slate-200 dark:border-slate-500 rounded p-6 mb-6">
                <p className="mb-6">
                    <label htmlFor="image" className="block font-semibold text-sm mb-2">
                        Select an Image to Upload
                    </label>
                    <input
                        id="image"
                        className="block w-full border-slate-400 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        type="file"
                        name="image"
                        required
                    />
                    <input
                        id="title"
                        className="block w-full border-slate-400 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        type="text"
                        name="title"
                        required
                    />
                    <input
                        id="techs"
                        className="block w-full border-slate-400 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        type="text"
                        name="techs"
                        required
                    />
                    <input
                        id="content_url"
                        className="block w-full border-slate-400 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        type="text"
                        name="content_url"
                        required
                    />
                </p>
                <Button>Submit</Button>
            </form>
        );
    };
}
export default FileUploader*/
