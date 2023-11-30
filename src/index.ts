import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import {expressMiddleware} from '@apollo/server/express4'
import bodyParser from 'body-parser';
import express from 'express'
import cors from 'cors'

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
    const app = express()
    const server = new ApolloServer({
      typeDefs,
      resolvers
    })

    app.use(bodyParser.json())
    app.use(cors())

    await server.start()

    app.use('/graphql',expressMiddleware(server))

    app.listen(8001,()=>console.log('Server started on http://localhost:8001/graphql'))
  }

  startServer()
