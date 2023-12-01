import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer'
import {expressMiddleware} from '@apollo/server/express4'
import {PrismaClient,Prisma} from '@prisma/client'
import {DefaultArgs} from '@prisma/client/runtime/library'
import bodyParser from 'body-parser';
import express from 'express'
import http from 'http'
import cors from 'cors'


const app = express()
const httpServer = http.createServer(app)


interface Context {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
  // userInfo: {
  //   userId: number
  // } 
}

interface MyContext {
  token?: String;
}



const typeDefs = `#graphql

  type Book {
    title: String
    author: String
  }
  type Query {
    books: [Book]
  }
`;
const books = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    },
  ];

const resolvers = {
    Query: {
      books: () => books,
    },
  };

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
      '/graphql',

      cors<cors.CorsRequest>(),
      express.json(),
      expressMiddleware(server)
      )

    app.listen(8001,()=>console.log('Server started on http://localhost:8001/graphql'))
  }

  startServer()
