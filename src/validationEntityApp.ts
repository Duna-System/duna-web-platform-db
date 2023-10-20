import { Schema, model } from 'mongoose';
import { IEntity } from './interefaces';

const entitySchema = new Schema<IEntity>({
  _id: { type: String, required: true },
  projectId: { type: String, required: true, index: true },
  type: { type: String, required: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  sizeMB: { type: Number, required: true },
  shareGroup: { type: String, required: true },
});

const entityModel = model<IEntity>('entity', entitySchema);
export default entityModel;
