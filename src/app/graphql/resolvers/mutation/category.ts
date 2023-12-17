
export const categoryResolvers = {
    category_create: async (parent: any, args: any, {prisma,userInfo}: any) => {
     
        
        if (userInfo && (userInfo.userId === null || userInfo.userId === undefined)) {
            return {
                message: 'Login first',
                status: 400,
                result: null
            }
        }

        const isUserExist = await prisma.user.findFirst({
            where: {
                AND: [
                    { id: userInfo.userId },
                    { role: 'ADMIN' }
                ]
            }
        })
        if (!isUserExist) {
            return {
                message: 'Unauthorized access',
                status: 400,
                result: null
            }
        }

        const ifExist = await prisma.category.findFirst({
            where: {
                OR: [
                    { name: { equals: (args.name).toLowerCase() } },
                    { name: { equals: (args.name).toUpperCase() } },
                    { name: { equals: (args.name).charAt(0).toUpperCase() + (args.name).slice(1) } },
                ],
            }
        })

        if (ifExist) {
            return {
                message: 'This category already exist',
                status: 400,
                result: null
            }
        }

        const category_created = await prisma.category.create({
            data: {
                ...args,
                userId: userInfo.userId
            }
        })

        return {
            message: "New category created successfully",
            status: 200,
            result: category_created
        }

    },


    category_update: async (parent: any, { id, categoryData }: any, { prisma, userInfo }: any) => {

        if (userInfo && (userInfo.userId === null || userInfo.userId === undefined)) {
            return {
                message: 'Login first',
                status: 400,
                result: null
            }
        }
        const isUserExist = await prisma.user.findFirst({
            where: {
                AND: [
                    { id: userInfo.userId },
                    { role: 'ADMIN' }
                ]
            }
        })

        if (!isUserExist) {
            return {
                message: 'Admin access required',
                status: 400,
                result: null
            }
        }

        const ifValidUser = await prisma.category.findFirst({
            where: {
                userId: userInfo.userId
            }
        })

        if (!ifValidUser) {
            return {
                message: 'Unauthorized access',
                status: 400,
                result: null
            }
        }


        const category_updated = await prisma.category.update({
            where: {
                id: Number(id),
            },
            data: {
                ...categoryData
            }
        })

        if (category_updated) {
            return {
                message: 'Category updated successfully',
                status: 200,
                result: category_updated
            }
        }
    },


    category_delete: async (parent: any, args: any, { prisma, userInfo }: any) => {

        const isAuthorized = await prisma.category.findFirst({
            where: {
                userId: userInfo.userId
            }
        })
        if (!isAuthorized) {
            return {
                message: 'You are not authorized!',
                status: 400,
                result: null
            }
        }

        const isDeleted = await prisma.category.delete({
            where:{
                id:Number(args.catId)
            }
        })

        if(!isDeleted){
            return {
                message: 'Delete not successful',
                status: 400,
                result: null
            }
        }

        return{
            message: 'Delete successful',
            status: 200,
            result: isDeleted
        }
    }


}