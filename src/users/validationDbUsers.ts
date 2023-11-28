import dotenv from 'dotenv'
import { MongoClient, Db, Collection } from 'mongodb'
import { IUser } from '../interfaces';

dotenv.config()
export async function createUserCollectionWithValidation(
    uri: string,
    databaseName: string,
    collectionName: string
): Promise<void> {
    const client = new MongoClient(uri);
    await client.connect();

    const db: Db = client.db(databaseName);
    const colecao: Collection<IUser> = db.collection(collectionName);

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
                    createdAt: {
                        bsonType: 'date',
                        description: 'Deve ser uma data e é obrigatório.',
                    },
                },
            },
        },
        validationLevel: 'strict',
        validationAction: 'error',
    };

    // Criação do índice de expiração no campo 'createdAt' após 2 minutos
    await colecao.createIndex({ createdAt: 1 }, { expireAfterSeconds: 120 });

    await db.command({
        collMod: colecao.collectionName,
        validator: validationRules.validator,
        validationLevel: validationRules.validationLevel,
        validationAction: validationRules.validationAction,
    });

    console.log(
        `Coleção ${collectionName} com regras de validação e expiração criada com sucesso.`
    );

    await client.close();
}
