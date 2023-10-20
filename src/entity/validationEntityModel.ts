import { Schema, model } from 'mongoose';
import { IEntityDb } from '../interfaces';

  const entitySchema = new Schema<IEntityDb>({
  _id: { type: String, required: true },
  projectId: { type: String, required: true, index: true },
  type: { type: String, required: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  sizeMB: { type: Number, required: true },
  shareGroup: { type: String, required: true },
});

export const entityModel = model<IEntityDb>('entity', entitySchema);
