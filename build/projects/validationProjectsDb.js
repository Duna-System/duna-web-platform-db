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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProjectCollectionWithValidation = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_1 = require("mongodb");
dotenv_1.default.config();
function createProjectCollectionWithValidation(uri, databaseName, collection_projects) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new mongodb_1.MongoClient(uri);
        yield client.connect();
        const db = client.db(databaseName);
        const colecao = db.collection(collection_projects);
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
                        favorite: { bsonType: 'bool', description: 'Indicador de favorito (boolean)' },
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
        yield colecao.createIndex({ user_id: 1 });
        yield db.command({
            collMod: collection_projects,
            validator: validationRules.validator,
            validationLevel: validationRules.validationLevel,
            validationAction: validationRules.validationAction,
        });
        console.log(`Coleção ${collection_projects} com regras de validação criada com sucesso.`);
        yield client.close();
    });
}
exports.createProjectCollectionWithValidation = createProjectCollectionWithValidation;
