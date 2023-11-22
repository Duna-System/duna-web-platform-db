"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectModel = void 0;
const mongoose_1 = require("mongoose");
const projectSchema = new mongoose_1.Schema({
    _id: { type: String, required: true },
    user_id: { type: String, required: true, index: true },
    name: { type: String, required: true },
    clientName: { type: String, required: true },
    type: { type: String, required: true },
    snapshot: { type: String, required: false },
    favorite: { type: Boolean, required: true },
    clouds: { type: [String], default: [], ref: 'entity' },
    images: { type: [String], default: [], ref: 'entity' },
    bim: { type: [String], default: [], ref: 'entity' },
    createdAt: { type: Number, required: true },
    modifiedAt: { type: Number, required: true },
    owner: { type: String, required: false },
    accessType: { type: String, required: false },
    publicAccessToken: { type: String, required: true },
    status: { type: String, required: true },
});
exports.projectModel = (0, mongoose_1.model)('project', projectSchema);
