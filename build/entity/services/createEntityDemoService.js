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
exports.creatDemoEntity = void 0;
const validationEntityModel_1 = require("../validationEntityModel");
const interfaces_1 = require("../../interfaces");
function creatDemoEntity() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const existingDemoEntity = yield validationEntityModel_1.entityModel.findOne({
                _id: 'demo@example.com',
            });
            if (!existingDemoEntity) {
                const DemoEntity = {
                    _id: '123',
                    projectId: '123',
                    type: interfaces_1.EntityType.PointCloud,
                    name: 'entityName',
                    location: '/projects/9dd80d4a-5592-49cd-9fdf-96d16b1d6a72/5b9a1d40-28f9-4991-9a95-7bc72afad8fD/example',
                    sizeMB: 10,
                    shareGroup: interfaces_1.ShareGroupType.Public
                };
                const newDemoEntity = new validationEntityModel_1.entityModel(DemoEntity);
                yield newDemoEntity.save();
                console.log('Entidade de demonstração criado com sucesso.');
            }
            else {
                console.log('Entidade de demonstração já existe.');
            }
        }
        catch (error) {
            console.error('Erro ao criar Entidade de demonstração:', error);
            throw error;
        }
    });
}
exports.creatDemoEntity = creatDemoEntity;
