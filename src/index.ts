import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import { resolvers } from './app/graphql/resolvers';
import { typeDefs } from './app/graphql/schema';
import { jwtHelper } from './app/utils/jwtValidation';

export const prisma = new PrismaClient()
const app = express()
const httpServer = http.createServer(app)


interface Context {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
  userInfo: {
    userId: number
  } 
}

interface MyContext {
  token?: String;
}


async function startServer(){
    
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      plugins:[ApolloServerPluginDrainHttpServer({httpServer})],
      introspection:true
    })
    app.use(bodyParser.json())
    app.use(cors())

    await server.start()

    app.use(
      '/api/graphql',

      cors<cors.CorsRequest>(),
      express.json(),
      expressMiddleware(server,{
        context:async({req}):Promise<Context>=>{
          const userInfo = await jwtHelper.getInfoFromToken(req.headers.authorization as string)
          
          return {
            prisma,
            userInfo
          }
        }
      })
      )

    app.listen(8001,()=>console.log('Server started on http://localhost:8001/api/graphql'))
}

startServer()
