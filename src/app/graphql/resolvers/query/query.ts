

export const Query = {
  users: async (parent: any, args: any, { prisma }: any) => {
    return await prisma.user.findMany({})
  },

  profile: async (parent: any, args: any, { prisma, userInfo }: any) => {
    return await prisma.user.findFirst({
      where: {
        id: userInfo.userId
      }
    })
  },

  posts: async (parent: any, args: any, { prisma }: any) => {
    const response = await prisma.post.findMany({
      // where:{
      //   published:true
      // },
      orderBy: {
        createdAt: 'desc'
      }

    })
    return response
  },

  categories: async (parent: any, args: any, { prisma }: any) => {
    const response = await prisma.category.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    return response
  },

  banners: async (parent: any, args: any, { prisma }: any) => {
    return await prisma.banner.findMany({});
  }
}