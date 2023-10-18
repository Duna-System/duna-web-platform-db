import { config } from './config';
import { ErrorMessages } from 'duna-web-platform-error-defs';
import { MongoClient, Db } from 'mongodb';
import { criarColecaoComValidacao } from './validationDB';

export const connectToDatabase = async (): Promise<Db> => {
    try {
        const mongodbUri = config.db.mongoUri;
        const databaseName = config.db.databaseName;

        if (!mongodbUri || !databaseName) {
            const err = ErrorMessages.ResourceDoesNotExist;
            err.Details = 'Resource cannot be found';
            throw err;
        }

        const client = new MongoClient(mongodbUri);
        await client.connect();
        console.log('Connected to MongoDB');

        // // Chame a função para criar a coleção com validação
        // await criarColecaoComValidacao(client);

        return client.db(databaseName);
    } catch (error) {
        throw error;
    }
};