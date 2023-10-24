import { Schema, model } from 'mongoose';

export interface IUserDb {
    _id: string;
    name: string;
    lastName: string;
    email: string;
  }
  
const userProjectSchema = new Schema<IUserDb>({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
});

export const userModelProjects = model<IUserDb>('user', userProjectSchema);

