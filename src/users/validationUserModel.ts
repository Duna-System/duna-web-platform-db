import mongoose, { Document, Model } from 'mongoose'
import { IUsers } from '../interfaces'

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
    quota: {
        pointCloudQuotaMB: { type: Number, required: true },
        imageSizeQuotaMB: { type: Number, required: true },
        BIMSizeQuotaMB: { type: Number, required: true },
        pointCloudUsedMB: { type: Number, required: true },
        imageUsedMB: { type: Number, required: true },
        BIMUsedMB: { type: Number, required: true },
    },
    paymentInfo: {
        customerId: { type: String, required: false, default: '' },
        plan: { type: String, required: false, default: '' },
        expirationDate: { type: Date, required: false, default: '' },
    },
    customerId: { type: String, required: false },
    validatedMail: { type: Boolean, required: true, default: false },
})

const UserModel: Model<IUsers> = mongoose.model<IUsers>('user', UserSchema)

export { UserModel }
