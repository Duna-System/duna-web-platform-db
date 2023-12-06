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
exports.createDemoUserService = void 0;
const validationProjectsModel_1 = require("../validationProjectsModel");
const interfaces_1 = require("../../interfaces");
function createDemoUserService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const existingDemoProject = yield validationProjectsModel_1.projectModel.findOne({
                projectId: 'demo@example.com',
            });
            if (!existingDemoProject) {
                const demoProject = {
                    _id: '123',
                    user_id: '123',
                    name: 'Example',
                    clientName: 'Example',
                    type: 'Example',
                    favorite: true,
                    clouds: ['cloud_id_1', 'cloud_id_2'],
                    images: ['image_id_1', 'image_id_2'],
                    bim: ['bim_id_1', 'bim_id_2'],
                    projectQuota: {
                        pointCloudUsedMB: 50,
                        imageUsedMB: 100,
                        BIMUsedMB: 150,
                    },
                    createdAt: Date.now(),
                    modifiedAt: Date.now(),
                    publicAccessToken: 'Token de Acesso Público',
                    status: interfaces_1.ProjectStatus.IN_PROGRESS,
                    accessType: interfaces_1.ProjectAccessType.INTERNAL,
                    owner: 'Example',
                };
                const newDemoProject = new validationProjectsModel_1.projectModel(demoProject);
                yield newDemoProject.save();
                console.log('Projeto de demonstração criado com sucesso.');
            }
            else {
                console.log('Projeto de demonstração já existe.');
            }
        }
        catch (error) {
            console.error('Erro ao criar Projeto de demonstração:', error);
            throw error;
        }
    });
}
exports.createDemoUserService = createDemoUserService;
