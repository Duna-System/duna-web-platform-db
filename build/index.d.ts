import { config } from './config';
import { criarColecaoComValidacao } from './validationDB';
import { connectToDatabase } from './connect';
import mongoose, { Document } from 'mongoose';
export interface IUsers extends Document {
    _id: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    actingField: string;
    phoneNumber: string;
    postalCode: string;
    useObjective: string;
    imagePath: string;
    cep: string;
    street: string;
    number: string;
    complement: string;
    [key: string]: any;
}
declare const UserModel: mongoose.Model<IUsers, {}, {}, {}, mongoose.Document<unknown, {}, IUsers> & IUsers & Required<{
    _id: string;
}>, any>;
export default UserModel;
export { config, criarColecaoComValidacao, connectToDatabase };
