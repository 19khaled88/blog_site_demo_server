import path from 'path'
import dotenv from 'dotenv'

dotenv.config({path:path.join(process.cwd(), '.env')})

export default{
    jwt_secret:process.env.JWT_SECRET as string,
    cloud_name:process.env.CLOUDINARY_NAME as string,
    api_key:process.env.CLOUDINARY_API_KEY as string,
    api_secret:process.env.CLOUDINARY_API_SECRET as string
}