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
exports.categoryResolvers = void 0;
exports.categoryResolvers = {
    category_create: (parent, args, { prisma, userInfo }) => __awaiter(void 0, void 0, void 0, function* () {
        if (userInfo && (userInfo.userId === null || userInfo.userId === undefined)) {
            return {
                message: 'Login first',
                status: 400,
                result: null
            };
        }
        const isUserExist = yield prisma.user.findFirst({
            where: {
                AND: [
                    { id: userInfo.userId },
                    { role: 'ADMIN' }
                ]
            }
        });
        if (!isUserExist) {
            return {
                message: 'Unauthorized access',
                status: 400,
                result: null
            };
        }
        const ifExist = yield prisma.category.findFirst({
            where: {
                OR: [
                    { name: { equals: (args.name).toLowerCase() } },
                    { name: { equals: (args.name).toUpperCase() } },
                    { name: { equals: (args.name).charAt(0).toUpperCase() + (args.name).slice(1) } },
                ],
            }
        });
        if (ifExist) {
            return {
                message: 'This category already exist',
                status: 400,
                result: null
            };
        }
        const category_created = yield prisma.category.create({
            data: Object.assign(Object.assign({}, args), { userId: userInfo.userId })
        });
        return {
            message: "New category created successfully",
            status: 200,
            result: category_created
        };
    }),
    category_update: (parent, { id, categoryData }, { prisma, userInfo }) => __awaiter(void 0, void 0, void 0, function* () {
        if (userInfo && (userInfo.userId === null || userInfo.userId === undefined)) {
            return {
                message: 'Login first',
                status: 400,
                result: null
            };
        }
        const isUserExist = yield prisma.user.findFirst({
            where: {
                AND: [
                    { id: userInfo.userId },
                    { role: 'ADMIN' }
                ]
            }
        });
        if (!isUserExist) {
            return {
                message: 'Admin access required',
                status: 400,
                result: null
            };
        }
        const ifValidUser = yield prisma.category.findFirst({
            where: {
                userId: userInfo.userId
            }
        });
        if (!ifValidUser) {
            return {
                message: 'Unauthorized access',
                status: 400,
                result: null
            };
        }
        const category_updated = yield prisma.category.update({
            where: {
                id: Number(id),
            },
            data: Object.assign({}, categoryData)
        });
        if (category_updated) {
            return {
                message: 'Category updated successfully',
                status: 200,
                result: category_updated
            };
        }
    }),
    category_delete: (parent, args, { prisma, userInfo }) => __awaiter(void 0, void 0, void 0, function* () {
        const isAuthorized = yield prisma.category.findFirst({
            where: {
                userId: userInfo.userId
            }
        });
        if (!isAuthorized) {
            return {
                message: 'You are not authorized!',
                status: 400,
                result: null
            };
        }
        const isDeleted = yield prisma.category.delete({
            where: {
                id: Number(args.catId)
            }
        });
        if (!isDeleted) {
            return {
                message: 'Delete not successful',
                status: 400,
                result: null
            };
        }
        return {
            message: 'Delete successful',
            status: 200,
            result: isDeleted
        };
    })
};
