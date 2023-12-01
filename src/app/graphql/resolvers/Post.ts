// import { userLoader } from "../../loader/useLoader"

export const Post = {
    user:async(parent: any, args: any, { prisma, userInfo }:any)=>{
       
        const response = await prisma.user.findUnique({
            where:{
                id:parent.userId
            }
        })
        return response


         // return userLoader.load(parent.userId)
        // const response =await userLoader.load(parent.userId)
       
       
       
    }
}