import cloudinary from "../../../utils/uploadImage"
import { GraphQLUpload } from 'graphql-upload-ts'
// const url = 'https://fastly.picsum.photos/id/535/200/300.jpg?hmac=iN2CqXJjjbBwtMlTUpWyZV6xFRfk_-XSDYRSk2eFbsQ'

export const bannerResolvers = {
    create_banner: async (parent: any, args: any, { prisma, userInfo }: any) => {
        const banner_created = await prisma.banner.create({
            data: {
                imageUrl: args.imageUrl,
                userId: userInfo.userId,
                title: args.title
            }
        })
        if (!banner_created) {
            return {
                message: "Banner not created",
                status: 400,
                result: banner_created
            }
        }
        return {
            message: "New Banner created",
            status: 200,
            result: banner_created
        }
    }
}