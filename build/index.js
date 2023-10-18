"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = exports.criarColecaoComValidacao = exports.config = void 0;
const config_1 = require("./config");
Object.defineProperty(exports, "config", { enumerable: true, get: function () { return config_1.config; } });
const validationDB_1 = require("./validationDB");
Object.defineProperty(exports, "criarColecaoComValidacao", { enumerable: true, get: function () { return validationDB_1.criarColecaoComValidacao; } });
const connect_1 = require("./connect");
Object.defineProperty(exports, "connectToDatabase", { enumerable: true, get: function () { return connect_1.connectToDatabase; } });
