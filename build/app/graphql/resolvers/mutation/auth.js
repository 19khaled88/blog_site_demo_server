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
exports.authResolvers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtValidation_1 = require("../../../utils/jwtValidation");
exports.authResolvers = {
    signup: (parnet, args, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
        //check if user exist
        const isExist = yield prisma.user.findFirst({
            where: {
                email: args.email
            }
        });
        if (isExist) {
            return {
                message: 'This user already exist',
                token: null
            };
        }
        //hash password
        const hashedPass = yield bcrypt_1.default.hash(args.password, 12);
        try {
            const newUser = yield prisma.user.create({
                data: Object.assign(Object.assign({}, args), { password: hashedPass })
            });
            const token = yield jwtValidation_1.jwtHelper.createToken(newUser.id, newUser.role);
            return {
                message: `${newUser.role} created successfully`,
                token: token
            };
        }
        catch (error) {
            return {
                message: 'User not created',
                token: null
            };
        }
    }),
    signin: (parent, args, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
        //check if user exist
        const isExist = yield prisma.user.findFirst({
            where: {
                email: args.email
            }
        });
        if (!isExist) {
            return {
                message: 'User not exist',
                status: 400,
                token: null
            };
        }
        //decrypt password and compare if valid
        const decryptPass = yield bcrypt_1.default.compare(args.password, isExist.password);
        if (!decryptPass) {
            return {
                message: 'Email or Password Not match',
                token: null,
                status: 400,
            };
        }
        const token = yield jwtValidation_1.jwtHelper.createToken(isExist.id, isExist.role);
        return {
            message: 'User Loggedin successfully',
            token: token,
            status: 200
        };
    }),
};
