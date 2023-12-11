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
exports.prisma = void 0;
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const standalone_1 = require("@apollo/server/standalone");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const client_1 = require("@prisma/client");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const resolvers_1 = require("./app/graphql/resolvers");
const schema_1 = require("./app/graphql/schema");
const jwtValidation_1 = require("./app/utils/jwtValidation");
exports.prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const httpServer = http_1.default.createServer(app);
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const server = new server_1.ApolloServer({
        typeDefs: schema_1.typeDefs,
        resolvers: resolvers_1.resolvers
    });
    const { url } = yield (0, standalone_1.startStandaloneServer)(server, {
        listen: { port: 4001 },
        context: ({ req }) => __awaiter(void 0, void 0, void 0, function* () {
            const userInfo = yield jwtValidation_1.jwtHelper.getInfoFromToken(req.headers.authorization);
            return {
                prisma: exports.prisma,
                userInfo
            };
        })
    });
    console.log(`Server ready at :${url}`);
});
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const server = new server_1.ApolloServer({
            typeDefs: schema_1.typeDefs,
            resolvers: resolvers_1.resolvers,
            plugins: [(0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
            introspection: true
        });
        app.use(body_parser_1.default.json());
        app.use((0, cors_1.default)());
        yield server.start();
        app.use('/api/graphql', (0, cors_1.default)(), express_1.default.json(), (0, express4_1.expressMiddleware)(server, {
            context: ({ req }) => __awaiter(this, void 0, void 0, function* () {
                // console.log(req.headers.authorization)
                const userInfo = yield jwtValidation_1.jwtHelper.getInfoFromToken(req.headers.authorization);
                return {
                    prisma: exports.prisma,
                    userInfo
                };
            })
        }));
        app.listen(8001, () => console.log('Server started on http://localhost:8001/api/graphql'));
    });
}
startServer();
