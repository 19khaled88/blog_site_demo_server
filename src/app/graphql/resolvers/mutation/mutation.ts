
import { authResolvers } from './auth'
import { postResolvers } from './post'
import { profileResolvers } from './profile'
import { categoryResolvers } from './category'
  
export const Mutation= {
    ...authResolvers,
    ...postResolvers,
    ...profileResolvers,
    ...categoryResolvers
  }