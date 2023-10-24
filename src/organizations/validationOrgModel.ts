import { Schema, model } from 'mongoose'
import { IOrganization } from '../interfaces'

const organizationSchema = new Schema<IOrganization>({
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
})

export const organizationModel = model<IOrganization>(
    'organization',
    organizationSchema
)
