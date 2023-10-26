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
exports.createUserService = void 0;
const argon2_1 = __importDefault(require("argon2"));
const duna_web_platform_error_defs_1 = require("duna-web-platform-error-defs");
const uuid_1 = require("uuid");
const validationUserModel_1 = require("../validationUserModel");
function createUserService(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hashedPassword = yield argon2_1.default.hash(user.password);
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
