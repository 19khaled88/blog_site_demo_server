export const Category ={
    posts:async(parent:any, args:any, {prisma, userInfo}:any)=>{
       const response = await prisma.post.findMany({
        where:{
            cate_id:parent.id
        }
       })
       return response
    },

    user:async(parent: any, args: any, { prisma, userInfo }:any)=>{
       
        const response = await prisma.user.findUnique({
            where:{
                id:parent.userId
            }
        })
        return response 
       
    },
    
}