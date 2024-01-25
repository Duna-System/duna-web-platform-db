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
exports.createEntityCollectionWithValidation = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_1 = require("mongodb");
dotenv_1.default.config();
function createEntityCollectionWithValidation(uri, databaseName, collectionName) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new mongodb_1.MongoClient(uri);
        yield client.connect();
        const db = client.db(databaseName);
        const colecao = db.collection(collectionName);
        const validationRules = {
            validator: {
                $jsonSchema: {
                    bsonType: 'object',
                    required: [
                        'projectId',
                        'type',
                        'name',
                        'location',
                        'sizeMB',
                        'shareGroup',
                    ],
                    properties: {
                        projectId: {
                            bsonType: 'string',
                            description: 'Project ID must be a string and is required.',
                        },
                        type: {
                            bsonType: 'string',
                            description: 'Type must be a string and is required.',
                        },
                        name: {
                            bsonType: 'string',
                            description: 'Name must be a string and is required.',
                        },
                        location: {
                            bsonType: 'string',
                            description: 'Location must be a string and is required.',
                        },
                        sizeMB: {
                            bsonType: 'number',
                            description: 'SizeMB must be a number and is required.',
                        },
                        shareGroup: {
                            bsonType: 'string',
                            description: 'Share group must be a string and is required.',
                        },
                        parentName: {
                            bsonType: 'string',
                            description: 'Holds a name reference to a parent entity. Not required.',
                        },
                        childLocations: {
                            bsonType: 'array',
                            description: 'Holds locations of other objects belonging to the entity. Not required.',
                        },
                    },
                },
            },
            validationLevel: 'strict',
            validationAction: 'error',
        };
        yield colecao.createIndex({ projectId: 1 });
        yield db.command({
            collMod: colecao.collectionName,
            validator: validationRules.validator,
            validationLevel: validationRules.validationLevel,
            validationAction: validationRules.validationAction,
        });
        console.log(`Collection ${collectionName} with validation rules created successfully.`);
        yield client.close();
    });
}
exports.createEntityCollectionWithValidation = createEntityCollectionWithValidation;
