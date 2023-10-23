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
    [key: string]: any
}
export interface IProject {
  _id: string;
  user_id: string;
  name: string;
  clientName: string;
  type: string;
  snapshot?: string;
  favorite: boolean;
  quota: QuotaInfo;
  clouds: Array<string>;
  images: Array<string>;
  bim: Array<string>;
  createdAt: number;
  modifiedAt: number;
  publicAccessToken: string;
  status: ProjectStatus;
  owner?: string;
  accessType?: ProjectAccessType;
}

  export interface IEntity {
    _id: string;
    projectId: string;
    type: EntityType; // Enum to string.
    name: string;
    location: string;
    sizeMB: number;
    shareGroup: ShareGroupType;
  }
  export interface QuotaInfo {
    pointCloudQuotaMB: number;
    imageSizeQuotaMB: number;
    BIMSizeQuotaMB: number;
    pointCloudUsedMB: number;
    imageUsedMB: number;
    BIMUsedMB: number;
  }
  export enum ShareGroupType {
    Public = 'public',
    Private = 'private',
  }

export enum EntityType {
  PointCloud = 'clouds',
  Image = 'images',
  BIM = 'bim',
  Unknown = 'unknown',
}
export interface IProjectsInfo {
  projects: Array<IProject>;
}


export enum ProjectStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
}

export enum ProjectAccessType {
  INTERNAL = 'INTERNAL',
  PRIVATE = 'PRIVATE',
}