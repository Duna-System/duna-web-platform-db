import { Schema, model } from 'mongoose';
import { IProject } from '../interfaces';

const projectSchema = new Schema<IProject>({
  _id: { type: String, required: true },
  user_id: { type: String, required: true, index: true },
  name: { type: String, required: true },
  clientName: { type: String, required: true },
  type: { type: String, required: true },
  snapshot: { type: String, required: false },
  favorite: { type: Boolean, required: true },
  quota: {
    pointCloudQuotaMB: { type: Number, required: true },
    imageSizeQuotaMB: { type: Number, required: true },
    BIMSizeQuotaMB: { type: Number, required: true },
    pointCloudUsedMB: { type: Number, required: true },
    imageUsedMB: { type: Number, required: true },
    BIMUsedMB: { type: Number, required: true },
  },
  clouds: { type: [String], default: [], ref: 'entity' },
  images: { type: [String], default: [], ref: 'entity' },
  bim: { type: [String], default: [], ref: 'entity' },
  createdAt: { type: Number, required: true },
  modifiedAt: { type: Number, required: true },
  owner: { type: String, required: false },
  accessType: { type: String, required: false },
  publicAccessToken: { type: String, required: true },
  status: { type: String, required: true },
});

export const projectModel = model<IProject>('project', projectSchema);


// import { Schema, model } from 'mongoose';
// import { IEntityDb } from '../interfaces';

//   const entitySchema = new Schema<IEntityDb>({
//   _id: { type: String, required: true },
//   projectId: { type: String, required: true, index: true },
//   type: { type: String, required: true },
//   name: { type: String, required: true },
//   location: { type: String, required: true },
//   sizeMB: { type: Number, required: true },
//   shareGroup: { type: String, required: true },
// });

// export const entityModel = model<IEntityDb>('entity', entitySchema);