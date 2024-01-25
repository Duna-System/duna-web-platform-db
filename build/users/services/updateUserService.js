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
exports.updateUserService = void 0;
const validationUserModel_1 = require("../validationUserModel");
const duna_web_platform_error_defs_1 = require("duna-web-platform-error-defs");
function updateUserService(userId, updates) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const existingUser = yield validationUserModel_1.UserModel.findById(userId);
            if (!existingUser) {
                return null;
            }
            if (updates.name)
                existingUser.name = updates.name;
            if (updates.lastName)
                existingUser.lastName = updates.lastName;
            if (updates.email)
                existingUser.email = updates.email;
            if (updates.password)
                existingUser.password = updates.password;
            if (updates.actingField)
                existingUser.actingField = updates.actingField;
            if (updates.phoneNumber)
                existingUser.phoneNumber = updates.phoneNumber;
            if (updates.postalCode)
                existingUser.postalCode = updates.postalCode;
            if (updates.useObjective)
                existingUser.useObjective = updates.useObjective;
            if (updates.imagePath)
                existingUser.imagePath = updates.imagePath;
            if (updates.street)
                existingUser.street = updates.street;
            if (updates.number)
                existingUser.number = updates.number;
            if (updates.complement)
                existingUser.complement = updates.complement;
            if (updates.quota)
                existingUser.quota = updates.quota;
            if (updates.paymentInfo) {
                if (updates.paymentInfo.plan) {
                    existingUser.paymentInfo.plan = updates.paymentInfo.plan;
                }
                if (updates.paymentInfo.expirationDate) {
                    existingUser.paymentInfo.expirationDate =
                        updates.paymentInfo.expirationDate;
                }
            }
            yield existingUser.save();
            return existingUser;
        }
        catch (error) {
            const err = duna_web_platform_error_defs_1.ErrorMessages.InternalServerError;
            err.Details = 'Error updating user data.';
            throw err;
        }
    });
}
exports.updateUserService = updateUserService;
