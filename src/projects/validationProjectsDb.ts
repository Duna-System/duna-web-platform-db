import dotenv from 'dotenv'
import { MongoClient, Db, Collection } from 'mongodb'

dotenv.config()

export async function createProjectCollectionWithValidation(
    uri: string,
    databaseName: string,
    collection_projects: string
): Promise<void> {
    const client = new MongoClient(uri)
    await client.connect()

    const db: Db = client.db(databaseName)
    const colecao: Collection = db.collection(collection_projects)

    const validationRules = {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: [
                    '_id',
                    'user_id',
                    'name',
                    'clientName',
                    'type',
                    'favorite',
                    'clouds',
                    'images',
                    'bim',
                    'photogrammetry',
                    'projectQuota',
                    'createdAt',
                    'modifiedAt',
                    'publicAccessToken',
                    'status',
                ],
                properties: {
                    _id: {
                        bsonType: 'string',
                        description: 'project ID (string)',
                    },
                    user_id: {
                        bsonType: 'string',
                        description: 'user ID (string)',
                    },
                    name: {
                        bsonType: 'string',
                        description: 'Project name (string)',
                    },
                    clientName: {
                        bsonType: 'string',
                        description: 'Client name (string)',
                    },
                    type: {
                        bsonType: 'string',
                        description: 'Project type (string)',
                    },
                    favorite: {
                        bsonType: 'bool',
                        description: 'Favorite indicator (boolean)',
                    },
                    clouds: {
                        bsonType: 'array',
                        items: { bsonType: 'string' },
                        description:
                            'List of associated pointcloud entities (string array)',
                    },
                    images: {
                        bsonType: 'array',
                        items: { bsonType: 'string' },
                        description:
                            'List of associated image entities (string array)',
                    },
                    bim: {
                        bsonType: 'array',
                        items: { bsonType: 'string' },
                        description:
                            'List of associated BIM entities (string array)',
                    },
                    phtogrammetry: {
                        bsonType: 'array',
                        items: { bsonType: 'string' },
                        description:
                            'Photogrammetry entity [unique] (string array)',
                    },
                    projectQuota: {
                        bsonType: 'object',
                        required: [
                            'pointCloudUsedMB',
                            'imageUsedMB',
                            'BIMUsedMB',
                            'photogrammetryUsedMB',
                        ],
                        properties: {
                            pointCloudUsedMB: {
                                bsonType: 'number',
                                description:
                                    'Size in MB used by pointcloud entities (number)',
                            },
                            imageUsedMB: {
                                bsonType: 'number',
                                description:
                                    'Size in MB used by image entities (number)',
                            },
                            BIMUsedMB: {
                                bsonType: 'number',
                                description:
                                    'Size in MB used by BIM entities (number)',
                            },
                            photogrammetryUsedMB: {
                                bsonType: 'number',
                                description:
                                    'Size in MB used by photogrammetry entities (number)',
                            },
                        },
                    },
                    createdAt: {
                        bsonType: 'number',
                        description: 'project creation timestamp (number)',
                    },
                    modifiedAt: {
                        bsonType: 'number',
                        description: 'project modification timestamp (number)',
                    },
                    publicAccessToken: {
                        bsonType: 'string',
                        description:
                            'Public access token (for shared projects) (string)',
                    },
                    status: {
                        bsonType: 'string',
                        description: 'Project status (string)',
                    },
                },
            },
        },
        validationLevel: 'strict',
        validationAction: 'error',
    }

    await colecao.createIndex({ user_id: 1 })

    await db.command({
        collMod: collection_projects,
        validator: validationRules.validator,
        validationLevel: validationRules.validationLevel,
        validationAction: validationRules.validationAction,
    })

    console.log(
        `Collection ${collection_projects} with validation rules created successfully.`
    )

    await client.close()
}
