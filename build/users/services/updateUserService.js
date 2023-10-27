"use strict";
// import { ErrorMessages } from 'duna-web-platform-error-defs'
// import { UserModel } from '../validationUserModel'
// import { IUsers } from '../../interfaces'
// import argon2 from 'argon2'
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
// export async function updateUser(
//     userId: string,
//     updates: Partial<IUsers>
// ): Promise<IUsers | null> {
//     try {
//         const user = await UserModel.findOne({ _id: userId })
//         if (!user) {
//             return null
//         }
//         for (const key in updates) {
//             if (updates.hasOwnProperty(key)) {
//                 const value = updates[key]
//                 if (value === '') {
//                     return null
//                 }
//                 if (key === 'password') {
//                     const updatedValue = await argon2.hash(value)
//                     user[key] = updatedValue
//                 } else {
//                     user[key] = value
//                 }
//             }
//         }
//         const updatedUser = await user.save()
//         return updatedUser
//     } catch (error) {
//         const err = ErrorMessages.InternalServerError
//         err.Details = 'Error updating user data.'
//         throw err
//     }
// }
const validationUserModel_1 = require("../validationUserModel");
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
            yield existingUser.save();
            return existingUser;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.updateUserService = updateUserService;
