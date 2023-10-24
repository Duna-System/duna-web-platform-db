import dotenv from 'dotenv'
import { MongoClient, Db, Collection } from 'mongodb'

dotenv.config()

export async function createEntityCollectionWithValidation(
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
                    'projectId',
                    'type',
                    'name',
                    'location',
                    'sizeMB',
                    'shareGroup',
                ],
                properties: {
                    projectId: {
                        bsonType: 'string',
                        description:
                            'Project ID must be a string and is required.',
                    },
                    type: {
                        bsonType: 'string',
                        description: 'Type must be a string and is required.',
                    },
                    name: {
                        bsonType: 'string',
                        description: 'Name must be a string and is required.',
                    },
                    location: {
                        bsonType: 'string',
                        description:
                            'Location must be a string and is required.',
                    },
                    sizeMB: {
                        bsonType: 'number',
                        description: 'SizeMB must be a number and is required.',
                    },
                    shareGroup: {
                        bsonType: 'string',
                        description:
                            'Share group must be a string and is required.',
                    },
                },
            },
        },
        validationLevel: 'strict',
        validationAction: 'error',
    }

    await colecao.createIndex({ projectId: 1 })

    await db.command({
        collMod: colecao.collectionName,
        validator: validationRules.validator,
        validationLevel: validationRules.validationLevel,
        validationAction: validationRules.validationAction,
    })

    console.log(
        `Collection ${collectionName} with validation rules created successfully.`
    )

    await client.close()
}
