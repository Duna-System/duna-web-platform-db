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


export interface IEntityDb {
    _id: string;
    projectId: string;
    type: EntityType; 
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