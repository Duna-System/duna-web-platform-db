import { config } from './config'
import { criarColecaoComValidacao } from './validationDB'
import { connectToDatabase } from './connect'
import mongoose, { Document } from 'mongoose'

export interface IUsers extends Document {
    _id: string
    name: string
    lastName: string
    email: string
    password: string
    actingField: string
    phoneNumber: string
    postalCode: string
    useObjective: string
    imagePath: string
    cep: string
    street: string
    number: string
    complement: string
    [key: string]: any // Add an index signature
}

const UserModel = mongoose.model<IUsers>(
    'User',
    new mongoose.Schema({
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
)

export default UserModel

export { config, criarColecaoComValidacao, connectToDatabase,UserModel }
