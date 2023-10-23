import dotenv from 'dotenv';
import { MongoClient, Db, Collection } from 'mongodb';

dotenv.config();

export async function createProjectCollectionWithValidation(
    uri: string,
    databaseName: string,
    collectionName: string
): Promise<void> {
    const client = new MongoClient(uri);
    await client.connect();

    const db: Db = client.db(databaseName);
    const colecao: Collection = db.collection(collectionName);

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
                    'quota',
                    'clouds',
                    'images',
                    'bim',
                    'createdAt',
                    'modifiedAt',
                    'publicAccessToken',
                    'status',
                ],
                properties: {
                    _id: { bsonType: 'string', description: 'ID do projeto (string)' },
                    user_id: { bsonType: 'string', description: 'ID do usuário (string)' },
                    name: { bsonType: 'string', description: 'Nome do projeto (string)' },
                    clientName: { bsonType: 'string', description: 'Nome do cliente (string)' },
                    type: { bsonType: 'string', description: 'Tipo do projeto (string)' },
                    favorite: { bsonType: 'boolean', description: 'Indicador de favorito (boolean)' },
                    quota: {
                        bsonType: 'object',
                        required: ['pointCloudQuotaMB', 'imageSizeQuotaMB', 'BIMSizeQuotaMB', 'pointCloudUsedMB', 'imageUsedMB', 'BIMUsedMB'],
                        properties: {
                            pointCloudQuotaMB: { bsonType: 'number', description: 'Quota para nuvem de pontos (number)' },
                            imageSizeQuotaMB: { bsonType: 'number', description: 'Quota para tamanho da imagem (number)' },
                            BIMSizeQuotaMB: { bsonType: 'number', description: 'Quota para tamanho do BIM (number)' },
                            pointCloudUsedMB: { bsonType: 'number', description: 'Uso de nuvem de pontos (number)' },
                            imageUsedMB: { bsonType: 'number', description: 'Uso de tamanho da imagem (number)' },
                            BIMUsedMB: { bsonType: 'number', description: 'Uso de tamanho do BIM (number)' },
                        },
                    },
                    clouds: { bsonType: 'array', items: { bsonType: 'string' }, description: 'Lista de nuvens associadas (array de strings)' },
                    images: { bsonType: 'array', items: { bsonType: 'string' }, description: 'Lista de imagens associadas (array de strings)' },
                    bim: { bsonType: 'array', items: { bsonType: 'string' }, description: 'Lista de modelos BIM associados (array de strings)' },
                    createdAt: { bsonType: 'number', description: 'Timestamp de criação (number)' },
                    modifiedAt: { bsonType: 'number', description: 'Timestamp de modificação (number)' },
                    publicAccessToken: { bsonType: 'string', description: 'Token de acesso público (string)' },
                    status: { bsonType: 'string', description: 'Status do projeto (string)' },
                },
            },
        },
        validationLevel: 'strict',
        validationAction: 'error',
    };

    await colecao.createIndex({ user_id: 1 });

    await db.command({
        collMod: colecao.collectionName,
        validator: validationRules.validator,
        validationLevel: validationRules.validationLevel,
        validationAction: validationRules.validationAction,
    });

    console.log(
        `Coleção ${collectionName} com regras de validação criada com sucesso.`
    );

    await client.close();
}
