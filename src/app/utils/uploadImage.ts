import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'
import config from '../config';

dotenv.config();

cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.api_key,
    api_secret: config.api_secret,
})

const upload_image = async (file: string) => {
    try {
        if (!file) {
            return null
        }
        const result = await cloudinary.uploader.upload(file, {
            public_id: `${Date.now()}`,
            resource_type: 'image'
        })

        return {
            public_id: result.public_id,
            url: result.secure_url
        }

    } catch (error: any) {
        return {
            message: (error.message || 'Image not uploaded'),
            status: 400,

        }
    }
}
// export default upload_image
export default cloudinary

