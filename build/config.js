'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
exports.config = void 0
const dotenv_1 = __importDefault(require('dotenv'))
dotenv_1.default.config()
exports.config = {
    db: {
        mongoUri: process.env.MONGODB_CONNECT,
        databaseName: process.env.MONGODB_DATABASE,
        collectionName: process.env.MONGODB_COLLECTION,
    },
    jwt: {
        secret: process.env.API_SECRET,
    },
    // Used by front end. Do not share.
    jwt_api_key: process.env.API_KEY,
}
