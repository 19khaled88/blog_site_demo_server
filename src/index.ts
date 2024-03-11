// import { ApolloServer } from '@apollo/server';
// import {ApolloError} from 'apollo-server'
import {ApolloServer,gql} from 'apollo-server-express'
import {v2 as cloudinary} from 'cloudinary'
import {graphqlUploadExpress,GraphQLUpload} from 'graphql-upload-ts'
import { expressMiddleware } from '@apollo/server/express4';
// import {startStandaloneServer} from '@apollo/server/standalone'
// import {ApolloServerPluginLandingPageLocalDefault} from '@apollo/server/plugin/landingPage/default'
// import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import http from 'http';
import { resolvers } from './app/graphql/resolvers';
import { typeDefs } from './app/graphql/schema';
import { jwtHelper } from './app/utils/jwtValidation';

export const prisma = new PrismaClient()
const app = express()
// const httpServer = http.createServer(app)
export const cloud = cloudinary

interface Context {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
  cloud:any
  userInfo: {
    userId: number
  } 
}

interface MyContext {
  token?: String;
}

// const main = async()=>{
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers
//   })

//   const {url} = await startStandaloneServer(server,{
//     listen:{port:4001},
//     context:async({req}):Promise<Context>=>{
//       const userInfo = await jwtHelper.getInfoFromToken(req.headers.authorization as string)
//       return{
//         prisma,
//         userInfo,
//         cloud
//       }
//     }
//   })

//   console.log(`Server ready at :${url}`)
// }



async function startServer(){
    
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      csrfPrevention:true,
      cache:'bounded',
      context:async({req}):Promise<Context>=>{
        const userInfo = await jwtHelper.getInfoFromToken(req.headers.authorization as string)
        return {
          prisma,
          userInfo,
          cloud
        }
      },
      // plugins:[ ApolloServerPluginDrainHttpServer({httpServer}), ApolloServerPluginLandingPageLocalDefault({embed:true}) ],
      introspection:true
    })


    app.use(bodyParser.json())
    app.use(cors())
    app.use(express.json())

    await server.start()

    server.applyMiddleware({
      app
      

    })
    app.use(
      '/',
      
      cors<cors.CorsRequest>(),
      express.json(),
      graphqlUploadExpress(),
     
      // expressMiddleware(server,{
      //   context:async({req}):Promise<Context>=>{
      //     // console.log(req.headers.authorization)
          
      //     const userInfo = await jwtHelper.getInfoFromToken(req.headers.authorization as string)
      //     return {
      //       prisma,
      //       userInfo,
      //       cloud
      //     }
      //   }
      // })

      )

   

    app.listen(8001,()=>console.log(`Server started on http://localhost:8001${server.graphqlPath}`))
    // app.listen(8001,()=>console.log(`Server started on http://localhost:8001/api/graphql`))
}

startServer()
