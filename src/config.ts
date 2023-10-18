import dotenv from 'dotenv'

dotenv.config()

export const config = {
    db: {
        mongoUri: process.env.MONGODB_CONNECT as string,
        databaseName: process.env.MONGODB_DATABASE as string,
        collectionName: process.env.MONGODB_COLLECTION as string,
    },
    jwt: {
        secret: process.env.API_SECRET as string,
    },

    // Used by front end. Do not share.
    jwt_api_key: process.env.API_KEY as string,
}
