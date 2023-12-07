import dotenv from 'dotenv'
import { MongoClient, Db, Collection } from 'mongodb'
import { createDemoUserService } from './services/demoProjectService'

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
                    'projectQuota',
                    'createdAt',
                    'modifiedAt',
                    'publicAccessToken',
                    'status',
                ],
                properties: {
                    _id: {
                        bsonType: 'string',
                        description: 'ID do projeto (string)',
                    },
                    user_id: {
                        bsonType: 'string',
                        description: 'ID do usuário (string)',
                    },
                    name: {
                        bsonType: 'string',
                        description: 'Nome do projeto (string)',
                    },
                    clientName: {
                        bsonType: 'string',
                        description: 'Nome do cliente (string)',
                    },
                    type: {
                        bsonType: 'string',
                        description: 'Tipo do projeto (string)',
                    },
                    favorite: {
                        bsonType: 'bool',
                        description: 'Indicador de favorito (boolean)',
                    },
                    clouds: {
                        bsonType: 'array',
                        items: { bsonType: 'string' },
                        description:
                            'Lista de nuvens associadas (array de strings)',
                    },
                    images: {
                        bsonType: 'array',
                        items: { bsonType: 'string' },
                        description:
                            'Lista de imagens associadas (array de strings)',
                    },
                    bim: {
                        bsonType: 'array',
                        items: { bsonType: 'string' },
                        description:
                            'Lista de modelos BIM associados (array de strings)',
                    },
                    projectQuota: {
                        bsonType: 'object',
                        required: [
                            'pointCloudUsedMB',
                            'imageUsedMB',
                            'BIMUsedMB',
                        ],
                        properties: {
                            pointCloudUsedMB: {
                                bsonType: 'number',
                                description: 'Uso de nuvem de pontos (number)',
                            },
                            imageUsedMB: {
                                bsonType: 'number',
                                description:
                                    'Uso de tamanho da imagem (number)',
                            },
                            BIMUsedMB: {
                                bsonType: 'number',
                                description: 'Uso de tamanho do BIM (number)',
                            },
                        },
                    },
                    createdAt: {
                        bsonType: 'number',
                        description: 'Timestamp de criação (number)',
                    },
                    modifiedAt: {
                        bsonType: 'number',
                        description: 'Timestamp de modificação (number)',
                    },
                    publicAccessToken: {
                        bsonType: 'string',
                        description: 'Token de acesso público (string)',
                    },
                    status: {
                        bsonType: 'string',
                        description: 'Status do projeto (string)',
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
    
    await createDemoUserService()
    await client.close()
}
