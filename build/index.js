'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
exports.connectToDatabase =
    exports.criarColecaoComValidacao =
    exports.config =
        void 0
const config_1 = require('./config')
Object.defineProperty(exports, 'config', {
    enumerable: true,
    get: function () {
        return config_1.config
    },
})
const validationDB_1 = require('./validationDB')
Object.defineProperty(exports, 'criarColecaoComValidacao', {
    enumerable: true,
    get: function () {
        return validationDB_1.criarColecaoComValidacao
    },
})
const connect_1 = require('./connect')
Object.defineProperty(exports, 'connectToDatabase', {
    enumerable: true,
    get: function () {
        return connect_1.connectToDatabase
    },
})
const mongoose_1 = __importDefault(require('mongoose'))
const UserModel = mongoose_1.default.model(
    'User',
    new mongoose_1.default.Schema({
        _id: { type: String, required: true },
        name: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, unique: true },
        password: { type: String, required: true },
        actingField: { type: String, default: '' },
        phoneNumber: { type: String, default: '' },
        postalCode: { type: String, required: true, default: '' },
        useObjective: { type: String, default: '' },
        imagePath: { type: String, default: '' },
        street: { type: String, required: true, default: '' },
        number: { type: String, required: true, default: '' },
        complement: { type: String, default: '' },
    })
)
exports.default = UserModel
