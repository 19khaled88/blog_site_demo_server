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
exports.jwtHelper = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const createToken = (id, role) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.sign({ userId: id, userRole: role }, config_1.default.jwt_secret, { expiresIn: '1d' });
});
const getInfoFromToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (token != undefined && token.at(0) === '"' && token.at(-1) === '"') {
        token = token.slice(1, -1);
    }
    // const uninvertedToken = token.replace(/^"(.+)"$/,'$1')  // remove beginning and ending qoutes from token
    try {
        const userData = jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret);
        return userData;
    }
    catch (error) {
        return error;
    }
});
exports.jwtHelper = {
    createToken,
    getInfoFromToken
};
