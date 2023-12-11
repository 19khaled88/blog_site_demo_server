import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'

dotenv.config()


cloudinary.config({
    cloud_name: 'your_cloud_name',
    api_key: 'your_api_key',
    api_secret: 'your_api_secret',
})

const upload_image=async(file:string)=>{
    try {
        if(!file){
            return null
        }
        const result = await cloudinary.uploader.upload(file,{
            public_id:`${Date.now()}`,
            resource_type:'image'
        })
        
        return{
            public_id:result.public_id,
            url:result.secure_url
        }

    } catch (error:any) {
        return {
            message:(error.message || 'Image not uploaded'),
            status:400,

        }
    }
}
export default upload_image
// export default cloudinary

