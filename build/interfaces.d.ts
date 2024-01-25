export interface IUsers {
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
    quota: UserQuota;
    validatedMail: boolean;
    [key: string]: any;
}
export interface IEntityDb {
    _id: string;
    projectId: string;
    type: EntityType;
    name: string;
    location: string;
    sizeMB: number;
    shareGroup: ShareGroupType;
    parentName?: string;
    childLocations?: Array<string>;
}
/**
 * Project level quota. Contains summed up entity sized.
 */
export interface ProjectQuota {
    pointCloudUsedMB: number;
    imageUsedMB: number;
    BIMUsedMB: number;
    photogrammetryUsedMB: number;
}
/**
 * User level quota. Contains quota and used space from all projects.
 */
export interface UserQuota {
    pointCloudQuotaMB: number;
    imageSizeQuotaMB: number;
    BIMSizeQuotaMB: number;
    photogrammetryQuotaMB: number;
    pointCloudUsedMB: number;
    imageUsedMB: number;
    BIMUsedMB: number;
    photogrammetryUsedMB: number;
}
export interface IProjectDb {
    _id: string;
    user_id: string;
    name: string;
    clientName: string;
    type: string;
    snapshot?: string;
    favorite: boolean;
    clouds: Array<string>;
    images: Array<string>;
    bim: Array<string>;
    photogrammetry: Array<string>;
    projectQuota: ProjectQuota;
    createdAt: number;
    modifiedAt: number;
    publicAccessToken: string;
    status: ProjectStatus;
    owner?: string;
    accessType?: ProjectAccessType;
}
export interface IOrganizationDb {
    _id: string;
    memberLimit: number;
    members: Array<IMemberDb>;
    name: string;
    type: string;
}
export interface IMemberDb {
    user: string;
    role: OrganizationMemberRole;
}
export interface IUser {
    _id: string;
    name: string;
    lastName: string;
    email: string;
}
export declare enum OrganizationMemberRole {
    VIEWER = "VIEWER",
    EDITOR = "EDITOR",
    ADMIN = "ADMIN",
    OWNER = "OWNER"
}
export declare enum ProjectStatus {
    IN_PROGRESS = "IN_PROGRESS",
    FINISHED = "FINISHED"
}
export declare enum ProjectAccessType {
    INTERNAL = "INTERNAL",
    PRIVATE = "PRIVATE"
}
export declare enum ShareGroupType {
    Public = "public",
    Private = "private"
}
export declare enum EntityType {
    PointCloud = "clouds",
    Image = "images",
    BIM = "bim",
    Photogrammetry = "photogrammerty",
    Unknown = "unknown"
}
