"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizationModel = void 0;
const mongoose_1 = require("mongoose");
const organizationSchema = new mongoose_1.Schema({
    _id: { type: String, required: true },
    memberLimit: { type: Number, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    members: [
        {
            _id: false,
            user: { type: String, required: true, index: true },
            role: { type: String, required: true },
        },
    ],
});
exports.organizationModel = (0, mongoose_1.model)('organization', organizationSchema);
