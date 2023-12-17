"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutation = void 0;
const auth_1 = require("./auth");
const post_1 = require("./post");
const profile_1 = require("./profile");
const category_1 = require("./category");
const banner_1 = require("./banner");
exports.Mutation = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, auth_1.authResolvers), post_1.postResolvers), profile_1.profileResolvers), category_1.categoryResolvers), banner_1.bannerResolvers);
