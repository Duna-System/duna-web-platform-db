import dotenv from 'dotenv'
import { MongoClient, Db, Collection } from 'mongodb'
import { createDemoUserService } from './services/demoUserService'

dotenv.config()

export async function createUserCollectionWithValidation(
    uri: string,
    databaseName: string,
    collectionName: string
): Promise<void> {
    const client = new MongoClient(uri)
    await client.connect()

    const db: Db = client.db(databaseName)
    const colecao: Collection = db.collection(collectionName)

    const validationRules = {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: [
                    'name',
                    'lastName',
                    'password',
                    'postalCode',
                    'street',
                    'number',
                    'quota',
                ],
                properties: {
                    name: {
                        bsonType: 'string',
                        description: 'Deve ser uma string e é obrigatório.',
                    },
                    lastName: {
                        bsonType: 'string',
                        description: 'Deve ser uma string e é obrigatório.',
                    },
                    password: {
                        bsonType: 'string',
                        description: 'Deve ser uma string e é obrigatório.',
                    },
                    postalCode: {
                        bsonType: 'string',
                        description: 'Deve ser uma string e é obrigatório.',
                    },
                    street: {
                        bsonType: 'string',
                        description: 'Deve ser uma string e é obrigatório.',
                    },
                    number: {
                        bsonType: 'string',
                        description: 'Deve ser uma string e é obrigatório.',
                    },
                    complement: {
                        bsonType: 'string',
                        description: 'Deve ser uma string e é obrigatório.',
                    },
                    quota: {
                        bsonType: 'object',
                        required: [
                            'pointCloudQuotaMB',
                            'imageSizeQuotaMB',
                            'BIMSizeQuotaMB',
                            'pointCloudUsedMB',
                            'imageUsedMB',
                            'BIMUsedMB',
                        ],
                        properties: {
                            pointCloudQuotaMB: {
                                bsonType: 'number',
                                description:
                                    'Quota para nuvem de pontos (number)',
                            },
                            imageSizeQuotaMB: {
                                bsonType: 'number',
                                description:
                                    'Quota para tamanho da imagem (number)',
                            },
                            BIMSizeQuotaMB: {
                                bsonType: 'number',
                                description:
                                    'Quota para tamanho do BIM (number)',
                            },
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
                },
            },
        },
        validationLevel: 'strict',
        validationAction: 'error',
    }

    await colecao.createIndex({ _id: 1 })

    await db.command({
        collMod: colecao.collectionName,
        validator: validationRules.validator,
        validationLevel: validationRules.validationLevel,
        validationAction: validationRules.validationAction,
    })

    console.log(
        `Coleção ${collectionName} com regras de validação criada com sucesso.`
    )
    
    await createDemoUserService()

    await client.close()
}
