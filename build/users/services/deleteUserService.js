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
exports.deleteUserService = void 0;
const duna_web_platform_error_defs_1 = require("duna-web-platform-error-defs");
const validationUserModel_1 = require("../validationUserModel");
function deleteUserService(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield validationUserModel_1.UserModel.findOneAndDelete({ _id: userId });
        }
        catch (error) {
            const err = duna_web_platform_error_defs_1.ErrorMessages.InternalServerError;
            err.Details = 'Internal server Error ';
            throw err;
        }
    });
}
exports.deleteUserService = deleteUserService;
