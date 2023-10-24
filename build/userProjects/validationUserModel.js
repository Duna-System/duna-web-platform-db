"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModelProjects = void 0;
const mongoose_1 = require("mongoose");
const userProjectSchema = new mongoose_1.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
});
exports.userModelProjects = (0, mongoose_1.model)('user', userProjectSchema);
