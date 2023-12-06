import mongoose from 'mongoose'
import { ErrorMessages, IError } from 'duna-web-platform-error-defs'
import { createCollectionsWithValidations } from './createCollections/createCollections';

export async function connectToDatabase(url: string, databaseName: string) {
    try {
        await mongoose.connect(`${url}/${databaseName}`, {})
        console.log(`Conectado ao banco de dados: ${databaseName}`)
        await createCollectionsWithValidations(url, databaseName);
    } catch (error) {
        throw error
    }
}

export function checkConnectionStatus() {
    // 1 ->  Connected
    if (mongoose.connection.readyState != 1) {
        const err: IError = ErrorMessages.InternalServerError
        err.Details = `MongoDB disconnected`
        throw err
    }
}

export function subscribeToDatabaseEvents() {
    mongoose.connection.on('connected', () => {
        console.log(`⚡️[database]: MongoDB connected`)
    })

    mongoose.connection.on('error', (error) => {
        console.log(`⚡️[database]: MongoDB Error - ${error}`)
    })

    mongoose.connection.on('disconnected', () => {
        console.log(`⚡️[database]: MongoDB Disconnected`)
    })
}
