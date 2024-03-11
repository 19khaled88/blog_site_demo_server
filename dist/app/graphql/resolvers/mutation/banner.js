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
Object.defineProperty(exports, "__esModule", { value: true });
exports.bannerResolvers = void 0;
// const url = 'https://fastly.picsum.photos/id/535/200/300.jpg?hmac=iN2CqXJjjbBwtMlTUpWyZV6xFRfk_-XSDYRSk2eFbsQ'
exports.bannerResolvers = {
    create_banner: (parent, args, { prisma, userInfo }) => __awaiter(void 0, void 0, void 0, function* () {
        const banner_created = yield prisma.banner.create({
            data: {
                imageUrl: args.imageUrl,
                userId: userInfo.userId,
                title: args.title
            }
        });
        if (!banner_created) {
            return {
                message: "Banner not created",
                status: 400,
                result: banner_created
            };
        }
        return {
            message: "New Banner created",
            status: 200,
            result: banner_created
        };
    })
};
