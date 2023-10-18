"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const config_1 = require("./config");
const duna_web_platform_error_defs_1 = require("duna-web-platform-error-defs");
const mongodb_1 = require("mongodb");
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mongodbUri = config_1.config.db.mongoUri;
        const databaseName = config_1.config.db.databaseName;
        const collectionName = config_1.config.db.collectionName;
        if (!mongodbUri || !databaseName || !collectionName) {
            const err = duna_web_platform_error_defs_1.ErrorMessages.ResourceDoesNotExist;
            err.Details = 'Resource cannot be found ';
            throw err;
        }
        const client = new mongodb_1.MongoClient(mongodbUri);
        yield client.connect();
        console.log('Connected to MongoDB ');
        const db = client.db(databaseName);
        // // Chama a função para criar a coleção com validação
        // await criarColecaoComValidacao(mongodbUri, databaseName, collectionName)
        // Feche a conexão após criar a coleção com validação
        yield client.close();
    }
    catch (error) {
        throw error;
    }
});
exports.connectToDatabase = connectToDatabase;
