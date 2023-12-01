"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const mutation_1 = require("./mutation/mutation");
const query_1 = require("./query/query");
const Profile_1 = require("./Profile");
const Post_1 = require("./Post");
const User_1 = require("./User");
exports.resolvers = {
    Query: query_1.Query,
    Mutation: mutation_1.Mutation,
    Post: Post_1.Post,
    User: User_1.User,
    Profile: Profile_1.Profile
};
