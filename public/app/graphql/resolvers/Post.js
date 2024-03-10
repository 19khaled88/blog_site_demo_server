"use strict";
// import { userLoader } from "../../loader/useLoader"
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
exports.Post = {
    user: (parent, args, { prisma, userInfo }) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield prisma.user.findUnique({
            where: {
                id: parent.userId
            }
        });
        return response;
        // return userLoader.load(parent.userId)
        // const response =await userLoader.load(parent.userId)
    }),
    category: (parent, args, { prisma, userInfo }) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield prisma.category.findUnique({
            where: {
                id: parent.cate_id
            }
        });
        return response;
    })
};
