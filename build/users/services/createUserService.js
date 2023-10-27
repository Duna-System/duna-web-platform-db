"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.createUserService = void 0;
const argon2 = __importStar(require("argon2"));
const duna_web_platform_error_defs_1 = require("duna-web-platform-error-defs");
const uuid_1 = require("uuid");
const validationUserModel_1 = require("../validationUserModel");
function createUserService(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hashedPassword = yield argon2.hash(user.password);
            const existingUser = yield validationUserModel_1.UserModel.findOne({ email: user.email });
            if (existingUser) {
                const err = duna_web_platform_error_defs_1.ErrorMessages.ResourceExists;
                throw err;
            }
            const newUser = new validationUserModel_1.UserModel({
                _id: (0, uuid_1.v4)(),
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                password: hashedPassword,
                actingField: user.actingField,
                phoneNumber: user.phoneNumber,
                postalCode: user.postalCode,
                useObjective: user.useObjective,
                imagePath: user.imagePath,
                street: user.street,
                number: user.number,
                complement: user.complement,
            });
            const savedUser = yield newUser.save();
            return savedUser;
        }
        catch (error) {
            if (error != duna_web_platform_error_defs_1.ErrorMessages.ResourceExists) {
                error = duna_web_platform_error_defs_1.ErrorMessages.InternalServerError;
                error.Details = 'Possibly wrong data schema.';
            }
            throw error;
        }
    });
}
exports.createUserService = createUserService;
