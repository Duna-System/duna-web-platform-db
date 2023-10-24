import { Schema, model } from 'mongoose';
import { IUserDb } from '../interfaces';

const userSchema = new Schema<IUserDb>({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
});

export const userModelProjects = model<IUserDb>('user', userSchema);

