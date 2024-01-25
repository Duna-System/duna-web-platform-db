"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entityModel = void 0;
const mongoose_1 = require("mongoose");
const entitySchema = new mongoose_1.Schema({
    _id: { type: String, required: true },
    projectId: { type: String, required: true, index: true },
    type: { type: String, required: true },
    name: { type: String, required: true },
    location: { type: String, required: true },
    sizeMB: { type: Number, required: true },
    shareGroup: { type: String, required: true },
    parentName: { type: String, required: false },
    childLocations: { type: String, required: false },
});
exports.entityModel = (0, mongoose_1.model)('entity', entitySchema);
