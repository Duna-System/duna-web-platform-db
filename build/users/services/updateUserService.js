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
exports.updateUser = void 0;
const duna_web_platform_error_defs_1 = require("duna-web-platform-error-defs");
const validationUserModel_1 = require("../validationUserModel");
const argon2_1 = __importDefault(require("argon2"));
function updateUser(userId, updates) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield validationUserModel_1.UserModel.findOne({ _id: userId });
            if (!user) {
                return null;
            }
            for (const key in updates) {
                if (updates.hasOwnProperty(key)) {
                    const value = updates[key];
                    if (value === '') {
                        return null;
                    }
                    if (key === 'password') {
                        const updatedValue = yield argon2_1.default.hash(value);
                        user[key] = updatedValue;
                    }
                    else {
                        user[key] = value;
                    }
                }
            }
            const updatedUser = yield user.save();
            return updatedUser;
        }
        catch (error) {
            const err = duna_web_platform_error_defs_1.ErrorMessages.InternalServerError;
            err.Details = 'Error updating user data.';
            throw err;
        }
    });
}
exports.updateUser = updateUser;
