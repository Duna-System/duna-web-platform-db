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
exports.UserService = void 0;
const duna_web_platform_error_defs_1 = require("duna-web-platform-error-defs");
const connection_1 = require("../connection");
const validationUserModel_1 = require("../users/validationUserModel");
class UserService {
    constructor() {
        this.model = validationUserModel_1.UserModel;
    }
    configure() { }
    get(user_id, email) {
        return __awaiter(this, void 0, void 0, function* () {
            //Check if mongoDB is connected
            (0, connection_1.checkConnectionStatus)();
            let user;
            if (user_id) {
                user = yield this.model.findById(user_id).lean().exec();
            }
            else {
                user = yield this.model.findOne({ email: email }).lean().exec();
            }
            if (!user) {
                const id = user_id ? user_id : email;
                const err = duna_web_platform_error_defs_1.ErrorMessages.InternalServerError;
                err.Details = `User ${id} not found`;
                throw err;
            }
            return user;
        });
    }
}
exports.UserService = UserService;
