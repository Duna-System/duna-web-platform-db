"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    actingField: { type: String, default: '' },
    phoneNumber: { type: String, default: '' },
    postalCode: { type: String, required: true, default: '' },
    useObjective: { type: String, default: '' },
    imagePath: { type: String, default: '' },
    street: { type: String, required: true, default: '' },
    number: { type: String, required: true, default: '' },
    complement: { type: String, default: '' },
    quota: {
        pointCloudQuotaMB: { type: Number, required: true },
        imageSizeQuotaMB: { type: Number, required: true },
        BIMSizeQuotaMB: { type: Number, required: true },
        pointCloudUsedMB: { type: Number, required: true },
        imageUsedMB: { type: Number, required: true },
        BIMUsedMB: { type: Number, required: true },
    },
    validatedMail: { type: Boolean, required: true, default: false },
});
const UserModel = mongoose_1.default.model('user', UserSchema);
exports.UserModel = UserModel;
