

export const postResolvers = {
    post_create: async (parent: any, { post }: any, { prisma, userInfo }: any) => {

        const isExist = await prisma.user.findFirst({
            where: {
                id: userInfo.userId
            }
        })

        if (!isExist) {
            return {
                message: 'Unauthorized access',
                status: 400,
                result: null
            }
        }

        const post_created = await prisma.post.create({
            data: {
                ...post,
                userId: userInfo.userId
            }
        })
        if (post_created) {
            return {
                message: 'Post created successfully',
                status: 200,
                result: post_created
            }
        }
    },


    post_update: async (parent: any, { postId, post }: any, { prisma, userInfo }: any) => {
        if (post === undefined || post === null) {
            return {
                message: 'Nothing for updating',
                status: 400,
                result: null
            }
        }
        const isExist = await prisma.user.findFirst({
            where: {
                id: userInfo.userId
            }
        })
        if (!isExist) {
            return {
                message: 'Unauthorized access',
                status: 400,
                result: null
            }
        }
        if (userInfo.role === 'ADMIN') {
            const res = await prisma.post.update({
                where: {
                    id: Number(postId)
                },
                data: {
                    ...post
                }
            })

            return {
                message: 'Post updated successfully',
                status: 200,
                result: res
            }
        }

        if (userInfo.role === 'USER') {
            const res = await prisma.post.update({
                where: {
                    id: Number(postId),
                    userId: userInfo.userId
                },
                data: {
                    ...post
                }
            })

            return {
                message: 'Post updated successfully',
                status: 200,
                result: res
            }
        }
        return {
            message: 'Post not updated successfully',
            status: 400,
            result: null
        }

    },


    post_delete: async (parent: any, { postId }: any, { prisma, userInfo }: any) => {
        const isExist = await prisma.user.findFirst({
            where: {
                id: userInfo.userId
            }
        })
        if (!isExist) {
            return {
                message: 'Unauthorized access',
                status: 400,
                result: null
            }
        }
        if (userInfo.role === 'ADMIN') {
            const res = await prisma.post.delete({
                where: {
                    id: Number(postId)
                }
            })
            return {
                message: 'Post deleted successfully',
                status: 200,
                result: res
            }

        }
        if (userInfo.role === 'USER') {
            const res = await prisma.post.delete({
                where: {
                    id: Number(postId),
                    userId: userInfo.userId
                }
            })
            return {
                message: 'Post deleted successfully',
                status: 200,
                result: res
            }
        }
        return {
            message: 'Post not deleted!',
            status: 400,
            result: null
        }
    },


    post_publish: async (parent: any, { postId, post }: any, { prisma, userInfo }: any) => {

        const isExist = await prisma.post.findFirst({
            where: {
                id: Number(postId)
            }
        })

        if (!isExist) {
            return {
                message: 'This post does not exist',
                status: 400,
                result: null
            }
        }

        const isAuthorized = await prisma.user.findFirst({
            where: {
                id: Number(userInfo.userId)
            }
        })

        if (isAuthorized.role != 'ADMIN') {
            return {
                message: 'Unauthorized access',
                status: 400,
                result: null
            }
        }

        const post_published = await prisma.post.update({
            where: {
                id: Number(postId)
            },
            data: {
                ...post
            }
        })

        if (post_published.published === true) {
            return {
                message: 'Post published successfully',
                status: 200,
                result: post_published
            }
        } else if (post_published.published === false) {
            return {
                message: 'Post unpublished successfully',
                status: 200,
                result: post_published
            }
        }

    }
}