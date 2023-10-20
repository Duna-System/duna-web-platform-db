import mongoose, { Document, Model } from 'mongoose'
import { IUsers } from './interefaces'

const UserSchema = new mongoose.Schema<IUsers>({
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
})

const UserModel: Model<IUsers> = mongoose.model<IUsers>('User', UserSchema)

export { UserModel }
