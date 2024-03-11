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
exports.postResolvers = void 0;
exports.postResolvers = {
    post_create: (parent, { post }, { prisma, userInfo }) => __awaiter(void 0, void 0, void 0, function* () {
        const isExist = yield prisma.user.findFirst({
            where: {
                id: userInfo.userId
            }
        });
        if (!isExist) {
            return {
                message: 'Unauthorized access',
                status: 400,
                result: null
            };
        }
        const post_created = yield prisma.post.create({
            data: Object.assign(Object.assign({}, post), { userId: userInfo.userId })
        });
        if (post_created) {
            return {
                message: 'Post created successfully',
                status: 200,
                result: post_created
            };
        }
    }),
    post_update: (parent, { postId, post }, { prisma, userInfo }) => __awaiter(void 0, void 0, void 0, function* () {
        if (post === undefined || post === null) {
            return {
                message: 'Nothing for updating',
                status: 400,
                result: null
            };
        }
        const isExist = yield prisma.user.findFirst({
            where: {
                id: userInfo.userId
            }
        });
        if (!isExist) {
            return {
                message: 'Unauthorized access',
                status: 400,
                result: null
            };
        }
        if (userInfo.role === 'ADMIN') {
            const res = yield prisma.post.update({
                where: {
                    id: Number(postId)
                },
                data: Object.assign({}, post)
            });
            return {
                message: 'Post updated successfully',
                status: 200,
                result: res
            };
        }
        if (userInfo.role === 'USER') {
            const res = yield prisma.post.update({
                where: {
                    id: Number(postId),
                    userId: userInfo.userId
                },
                data: Object.assign({}, post)
            });
            return {
                message: 'Post updated successfully',
                status: 200,
                result: res
            };
        }
        return {
            message: 'Post not updated successfully',
            status: 400,
            result: null
        };
    }),
    post_delete: (parent, { postId }, { prisma, userInfo }) => __awaiter(void 0, void 0, void 0, function* () {
        const isExist = yield prisma.user.findFirst({
            where: {
                id: userInfo.userId
            }
        });
        if (!isExist) {
            return {
                message: 'Unauthorized access',
                status: 400,
                result: null
            };
        }
        if (userInfo.role === 'ADMIN') {
            const res = yield prisma.post.delete({
                where: {
                    id: Number(postId)
                }
            });
            return {
                message: 'Post deleted successfully',
                status: 200,
                result: res
            };
        }
        if (userInfo.role === 'USER') {
            const res = yield prisma.post.delete({
                where: {
                    id: Number(postId),
                    userId: userInfo.userId
                }
            });
            return {
                message: 'Post deleted successfully',
                status: 200,
                result: res
            };
        }
        return {
            message: 'Post not deleted!',
            status: 400,
            result: null
        };
    }),
    post_publish: (parent, { postId, post }, { prisma, userInfo }) => __awaiter(void 0, void 0, void 0, function* () {
        const isExist = yield prisma.post.findFirst({
            where: {
                id: Number(postId)
            }
        });
        if (!isExist) {
            return {
                message: 'This post does not exist',
                status: 400,
                result: null
            };
        }
        const isAuthorized = yield prisma.user.findFirst({
            where: {
                id: Number(userInfo.userId)
            }
        });
        if (isAuthorized.role != 'ADMIN') {
            return {
                message: 'Unauthorized access',
                status: 400,
                result: null
            };
        }
        const post_published = yield prisma.post.update({
            where: {
                id: Number(postId)
            },
            data: Object.assign({}, post)
        });
        if (post_published.published === true) {
            return {
                message: 'Post published successfully',
                status: 200,
                result: post_published
            };
        }
        else if (post_published.published === false) {
            return {
                message: 'Post unpublished successfully',
                status: 200,
                result: post_published
            };
        }
    })
};
