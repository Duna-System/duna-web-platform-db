import dotenv from 'dotenv'
import { MongoClient, Db, Collection } from 'mongodb'

dotenv.config()

export async function createOrganizationCollectionWithValidation(
    uri: string,
    databaseName: string,
    collection_organizations: string
): Promise<void> {
    const client = new MongoClient(uri)
    await client.connect()

    const db: Db = client.db(databaseName)
    const colecao: Collection = db.collection(collection_organizations)

    const validationRules = {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: ['_id', 'memberLimit', 'name', 'type', 'members'],
                properties: {
                    _id: {
                        bsonType: 'string',
                        description: '_id must be a string and is required.',
                    },
                    memberLimit: {
                        bsonType: 'number',
                        description:
                            'memberLimit must be a number and is required.',
                    },
                    name: {
                        bsonType: 'string',
                        description: 'name must be a string and is required.',
                    },
                    type: {
                        bsonType: 'string',
                        description: 'type must be a string and is required.',
                    },
                    members: {
                        bsonType: 'array',
                        description:
                            'members must be an array and is required.',
                        items: {
                            bsonType: 'object',
                            required: ['user', 'role'],
                            properties: {
                                user: {
                                    bsonType: 'string',
                                    description:
                                        'user must be a string and is required.',
                                },
                                role: {
                                    bsonType: 'string',
                                    description:
                                        'role must be a string and is required.',
                                },
                            },
                        },
                    },
                },
            },
        },
        validationLevel: 'strict',
        validationAction: 'error',
    }

    await colecao.createIndex({ user: 1 })

    await db.command({
        collMod: collection_organizations,
        validator: validationRules.validator,
        validationLevel: validationRules.validationLevel,
        validationAction: validationRules.validationAction,
    })

    console.log(
        `Collection ${collection_organizations} with validation rules created successfully.`
    )

    await client.close()
}
