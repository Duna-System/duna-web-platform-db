"use strict";
// import argon2 from 'argon2'
// import { ErrorMessages, IError } from 'duna-web-platform-error-defs'
// import { v4 as uuidv4 } from 'uuid'
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
// import { IUsers } from '../../interfaces'
// import { UserModel } from '../validationUserModel'
// export async function createUserService(user: IUsers): Promise<IUsers> {
//     try {
//         const hashedPassword = await argon2.hash(user.password)
//         const existingUser = await UserModel.findOne({ email: user.email })
//         if (existingUser) {
//             const err: IError = ErrorMessages.ResourceExists
//             throw err
//         }
//         const newUser = new UserModel({
//             _id: uuidv4(),
//             name: user.name,
//             lastName: user.lastName,
//             email: user.email,
//             password: hashedPassword,
//             actingField: user.actingField,
//             phoneNumber: user.phoneNumber,
//             postalCode: user.postalCode,
//             useObjective: user.useObjective,
//             imagePath: user.imagePath,
//             street: user.street,
//             number: user.number,
//             complement: user.complement,
//         })
//         const savedUser = await newUser.save()
//         return savedUser
//     } catch (error) {
//         if (error != ErrorMessages.ResourceExists) {
//             error = ErrorMessages.InternalServerError
//             ;(error as IError).Details = 'Possibly wrong data schema.'
//         }
//         throw error
//     }
// }
const validationUserModel_1 = require("../validationUserModel");
const uuid_1 = require("uuid");
const duna_web_platform_error_defs_1 = require("duna-web-platform-error-defs");
function createUserService(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
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
                password: user.password,
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
            if (error !== duna_web_platform_error_defs_1.ErrorMessages.ResourceExists) {
                error = duna_web_platform_error_defs_1.ErrorMessages.InternalServerError;
                error.Details = 'Possibly wrong data schema.';
            }
            throw error;
        }
    });
}
exports.createUserService = createUserService;
