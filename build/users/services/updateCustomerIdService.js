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
exports.updateCustomerId = void 0;
const duna_web_platform_error_defs_1 = require("duna-web-platform-error-defs");
const validationUserModel_1 = require("../validationUserModel");
function updateCustomerId(email, updates) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const filter = { email };
            const update = {
                $set: {
                    'paymentInfo.customerId': updates.customerId,
                    'paymentInfo.plan': updates.plan,
                    'paymentInfo.expirationDate': updates.expirationDate,
                },
            };
            const options = { new: true };
            const updatedUser = yield validationUserModel_1.UserModel.findOneAndUpdate(filter, update, options);
            if (!updatedUser) {
                const err = duna_web_platform_error_defs_1.ErrorMessages.UserNotFound.Message;
                throw err;
            }
            return updatedUser;
        }
        catch (error) {
            console.error('Error in updateCustomerId:', error);
            const err = duna_web_platform_error_defs_1.ErrorMessages.InternalServerError;
            err.Details = 'Error updating user data.';
            throw err;
        }
    });
}
exports.updateCustomerId = updateCustomerId;
