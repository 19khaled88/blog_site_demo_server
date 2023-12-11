import jwt, { Secret } from 'jsonwebtoken'
import config from '../config'

type tokenType = {
   userId: number | any,
   userRole: string | any
}

const createToken = async (id: number, role: string) => {

   return jwt.sign({ userId: id, userRole: role }, config.jwt_secret as Secret, { expiresIn: '1d' })

}

const getInfoFromToken = async (token: string): Promise<tokenType> => {
   
   if(token != undefined && token.at(0) === '"' && token.at(-1) === '"'){
      token = token.slice(1, -1)
   }
   // const uninvertedToken = token.replace(/^"(.+)"$/,'$1')  // remove beginning and ending qoutes from token

   try {
      const userData = jwt.verify(token, config.jwt_secret as Secret) as { userId: number, userRole: string }
     
      return userData
   } catch (error: any) {
      return error
   }
}

export const jwtHelper = {
   createToken,
   getInfoFromToken
}
