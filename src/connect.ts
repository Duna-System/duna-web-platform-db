import { config } from './config'
import { ErrorMessages } from 'duna-web-platform-error-defs'
import { MongoClient, Db, Collection } from 'mongodb'
import { criarColecaoComValidacao } from './validationDB'

export const connectToDatabase = async () => {
    try {
        const mongodbUri = config.db.mongoUri
        const databaseName = config.db.databaseName
        const collectionName = config.db.collectionName

        if (!mongodbUri || !databaseName || !collectionName) {
            const err = ErrorMessages.ResourceDoesNotExist
            err.Details = 'Resource cannot be found '
            throw err
        }

        const client = new MongoClient(mongodbUri)
        await client.connect()
        console.log('Connected to MongoDB ')

        const db: Db = client.db(databaseName)

        // // Chama a função para criar a coleção com validação
        // await criarColecaoComValidacao(mongodbUri, databaseName, collectionName)

        // Feche a conexão após criar a coleção com validação
        await client.close()
    } catch (error) {
        throw error
    }
}
