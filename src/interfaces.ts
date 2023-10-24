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
    _id: string
    projectId: string
    type: string
    name: string
    location: string
    sizeMB: number
    shareGroup: string
}
export interface QuotaInfo {
    pointCloudQuotaMB: number
    imageSizeQuotaMB: number
    BIMSizeQuotaMB: number
    pointCloudUsedMB: number
    imageUsedMB: number
    BIMUsedMB: number
}
export interface IProjectDb {
    _id: string
    user_id: string
    name: string
    clientName: string
    type: string
    snapshot?: string
    favorite: boolean
    quota: QuotaInfo
    clouds: Array<string>
    images: Array<string>
    bim: Array<string>
    createdAt: number
    modifiedAt: number
    publicAccessToken: string
    status: string
    owner?: string
    accessType?: string
}
export interface IOrganizationDb {
    _id: string
    memberLimit: number
    members: Array<IMemberDb>
    name: string
    type: string
}
export interface IMemberDb {
    user: string
    role: string
}

