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
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("../config"));
dotenv_1.default.config();
cloudinary_1.v2.config({
    cloud_name: config_1.default.cloud_name,
    api_key: config_1.default.api_key,
    api_secret: config_1.default.api_secret,
});
const upload_image = (file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!file) {
            return null;
        }
        const result = yield cloudinary_1.v2.uploader.upload(file, {
            public_id: `${Date.now()}`,
            resource_type: 'image'
        });
        return {
            public_id: result.public_id,
            url: result.secure_url
        };
    }
    catch (error) {
        return {
            message: (error.message || 'Image not uploaded'),
            status: 400,
        };
    }
});
// export default upload_image
exports.default = cloudinary_1.v2;
