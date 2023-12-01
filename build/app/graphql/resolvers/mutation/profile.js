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
exports.profileResolvers = void 0;
exports.profileResolvers = {
    profile_create: (parent, args, { prisma, userInfo }) => __awaiter(void 0, void 0, void 0, function* () {
        const isExist = yield prisma.profile.findFirst({
            where: {
                userId: userInfo.userId
            }
        });
        if (isExist) {
            return {
                message: 'Profile already created',
                status: 400,
                result: null
            };
        }
        const profile_created = yield prisma.profile.create({
            data: {
                userId: userInfo.userId,
                country: '',
                location: '',
                age: '',
                avatar: ''
            }
        });
        return {
            message: 'Profile created successfully',
            status: 200,
            result: profile_created
        };
    }),
    profile_update: (parent, args, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
        const isValid = yield prisma.profile.findFirst({
            where: {
                userId: args.id
            }
        });
        if (!isValid) {
            return {
                message: "This profile not exist",
                status: 400,
                result: null
            };
        }
        const update_profile = yield prisma.profile.update({
            where: {
                id: args.id
            },
            data: args.input
        });
        return {
            message: "Profile updated successfully",
            status: 200,
            result: update_profile
        };
    }),
};
