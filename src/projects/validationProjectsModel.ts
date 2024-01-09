import { Schema, model } from 'mongoose'
import { IProjectDb } from '../interfaces'

const projectSchema = new Schema<IProjectDb>({
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
    photogrammetry: { type: [String], default: [], ref: 'entity' },
    projectQuota: {
        pointCloudUsedMB: { type: Number, required: true },
        imageUsedMB: { type: Number, required: true },
        BIMUsedMB: { type: Number, required: true },
    },
    createdAt: { type: Number, required: true },
    modifiedAt: { type: Number, required: true },
    owner: { type: String, required: false },
    accessType: { type: String, required: false },
    publicAccessToken: { type: String, required: true },
    status: { type: String, required: true },
})

export const projectModel = model<IProjectDb>('project', projectSchema)
