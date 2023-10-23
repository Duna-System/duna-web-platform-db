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
exports.createOrganizationCollectionWithValidation = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_1 = require("mongodb");
dotenv_1.default.config();
function createOrganizationCollectionWithValidation(uri, databaseName, collectionName) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new mongodb_1.MongoClient(uri);
        yield client.connect();
        const db = client.db(databaseName);
        const colecao = db.collection(collectionName);
        const validationRules = {
            validator: {
                $jsonSchema: {
                    bsonType: 'object',
                    required: ['_id', 'memberLimit', 'name', 'type', 'members'],
                    properties: {
                        _id: {
                            bsonType: 'string',
                            description: '_id must be a string and is required.',
                        },
                        memberLimit: {
                            bsonType: 'number',
                            description: 'memberLimit must be a number and is required.',
                        },
                        name: {
                            bsonType: 'string',
                            description: 'name must be a string and is required.',
                        },
                        type: {
                            bsonType: 'string',
                            description: 'type must be a string and is required.',
                        },
                        members: {
                            bsonType: 'array',
                            description: 'members must be an array and is required.',
                            items: {
                                bsonType: 'object',
                                required: ['user', 'role'],
                                properties: {
                                    user: {
                                        bsonType: 'string',
                                        description: 'user must be a string and is required.',
                                    },
                                    role: {
                                        bsonType: 'string',
                                        description: 'role must be a string and is required.',
                                    },
                                },
                            },
                        },
                    },
                },
            },
            validationLevel: 'strict',
            validationAction: 'error',
        };
        yield colecao.createIndex({ user: 1 });
        yield db.command({
            collMod: collectionName,
            validator: validationRules.validator,
            validationLevel: validationRules.validationLevel,
            validationAction: validationRules.validationAction,
        });
        console.log(`Collection ${collectionName} with validation rules created successfully.`);
        yield client.close();
    });
}
exports.createOrganizationCollectionWithValidation = createOrganizationCollectionWithValidation;
