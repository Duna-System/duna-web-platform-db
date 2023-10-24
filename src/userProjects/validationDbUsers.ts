import dotenv from 'dotenv'
import { MongoClient, Db, Collection } from 'mongodb'

dotenv.config()

export async function createUserProjectCollectionWithValidation(
    uri: string,
    databaseName: string,
    collection_userProject_name: string
): Promise<void> {
    const client = new MongoClient(uri)
    await client.connect()

    const db: Db = client.db(databaseName)
    const colecao: Collection = db.collection(collection_userProject_name)

    const validationRules = {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: [
                    'name',
                    'lastName',
                    'email',
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
                    email: {
                        bsonType: 'string',
                        description: 'Deve ser uma string e é obrigatório.',
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
        `Coleção ${collection_userProject_name} with validation rules created successfully.`
    )

    await client.close()
}
