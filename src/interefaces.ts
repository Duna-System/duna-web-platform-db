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

export enum EntityType {
    PointCloud = 'clouds',
    Image = 'images',
    BIM = 'bim',
    Unknown = 'unknown',
  }
  
  export enum ShareGroupType {
    Public = 'public',
    Private = 'private',
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