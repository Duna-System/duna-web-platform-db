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
                        'clouds',
                        'images',
                        'bim',
                        'photogrammetry',
                        'projectQuota',
                        'createdAt',
                        'modifiedAt',
                        'publicAccessToken',
                        'status',
                    ],
                    properties: {
                        _id: {
                            bsonType: 'string',
                            description: 'project ID (string)',
                        },
                        user_id: {
                            bsonType: 'string',
                            description: 'user ID (string)',
                        },
                        name: {
                            bsonType: 'string',
                            description: 'Project name (string)',
                        },
                        clientName: {
                            bsonType: 'string',
                            description: 'Client name (string)',
                        },
                        type: {
                            bsonType: 'string',
                            description: 'Project type (string)',
                        },
                        favorite: {
                            bsonType: 'bool',
                            description: 'Favorite indicator (boolean)',
                        },
                        clouds: {
                            bsonType: 'array',
                            items: { bsonType: 'string' },
                            description: 'List of associated pointcloud entities (string array)',
                        },
                        images: {
                            bsonType: 'array',
                            items: { bsonType: 'string' },
                            description: 'List of associated image entities (string array)',
                        },
                        bim: {
                            bsonType: 'array',
                            items: { bsonType: 'string' },
                            description: 'List of associated BIM entities (string array)',
                        },
                        photogrammetry: {
                            bsonType: 'array',
                            items: { bsonType: 'string' },
                            description: 'Photogrammetry entity [unique] (string array)',
                        },
                        projectQuota: {
                            bsonType: 'object',
                            required: [
                                'pointCloudUsedMB',
                                'imageUsedMB',
                                'BIMUsedMB',
                                'photogrammetryUsedMB',
                            ],
                            properties: {
                                pointCloudUsedMB: {
                                    bsonType: 'number',
                                    description: 'Size in MB used by pointcloud entities (number)',
                                },
                                imageUsedMB: {
                                    bsonType: 'number',
                                    description: 'Size in MB used by image entities (number)',
                                },
                                BIMUsedMB: {
                                    bsonType: 'number',
                                    description: 'Size in MB used by BIM entities (number)',
                                },
                                photogrammetryUsedMB: {
                                    bsonType: 'number',
                                    description: 'Size in MB used by photogrammetry entities (number)',
                                },
                            },
                        },
                        createdAt: {
                            bsonType: 'number',
                            description: 'project creation timestamp (number)',
                        },
                        modifiedAt: {
                            bsonType: 'number',
                            description: 'project modification timestamp (number)',
                        },
                        publicAccessToken: {
                            bsonType: 'string',
                            description: 'Public access token (for shared projects) (string)',
                        },
                        status: {
                            bsonType: 'string',
                            description: 'Project status (string)',
                        },
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
        console.log(`Collection ${collection_projects} with validation rules created successfully.`);
        yield client.close();
    });
}
exports.createProjectCollectionWithValidation = createProjectCollectionWithValidation;
