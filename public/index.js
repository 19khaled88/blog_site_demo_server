"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloud = exports.prisma = void 0;
// import { ApolloServer } from '@apollo/server';
// import {ApolloError} from 'apollo-server'
const apollo_server_express_1 = require("apollo-server-express");
const cloudinary_1 = require("cloudinary");
const graphql_upload_ts_1 = require("graphql-upload-ts");
// import {startStandaloneServer} from '@apollo/server/standalone'
// import {ApolloServerPluginLandingPageLocalDefault} from '@apollo/server/plugin/landingPage/default'
// import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
const client_1 = require("@prisma/client");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const resolvers_1 = require("./app/graphql/resolvers");
const schema_1 = require("./app/graphql/schema");
const jwtValidation_1 = require("./app/utils/jwtValidation");
exports.prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
// const httpServer = http.createServer(app)
exports.cloud = cloudinary_1.v2;
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
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const server = new apollo_server_express_1.ApolloServer({
            typeDefs: schema_1.typeDefs,
            resolvers: resolvers_1.resolvers,
            csrfPrevention: true,
            cache: 'bounded',
            context: ({ req }) => __awaiter(this, void 0, void 0, function* () {
                const userInfo = yield jwtValidation_1.jwtHelper.getInfoFromToken(req.headers.authorization);
                return {
                    prisma: exports.prisma,
                    userInfo,
                    cloud: exports.cloud
                };
            }),
            // plugins:[ ApolloServerPluginDrainHttpServer({httpServer}), ApolloServerPluginLandingPageLocalDefault({embed:true}) ],
            introspection: true
        });
        app.use(body_parser_1.default.json());
        app.use((0, cors_1.default)());
        app.use(express_1.default.json());
        yield server.start();
        server.applyMiddleware({
            app,
            path: '/graphql'
        });
        app.use('/api/graphql', (0, cors_1.default)(), express_1.default.json(), (0, graphql_upload_ts_1.graphqlUploadExpress)());
        app.listen(8001, () => console.log(`Server started on http://localhost:8001${server.graphqlPath}`));
        // app.listen(8001,()=>console.log(`Server started on http://localhost:8001/api/graphql`))
    });
}
startServer();
