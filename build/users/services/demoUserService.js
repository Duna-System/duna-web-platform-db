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
const validationUserModel_1 = require("../validationUserModel");
function createDemoUserService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const existingDemoUser = yield validationUserModel_1.UserModel.findOne({
                email: 'demo@example.com',
            });
            if (!existingDemoUser) {
                const demoUser = {
                    _id: 'dc168171-2895-40a3-9800-70bf93ac491a',
                    name: 'Demo',
                    lastName: 'User',
                    email: 'demo@example.com',
                    password: 'demo@123',
                    actingField: 'teste',
                    phoneNumber: 'teste',
                    postalCode: 'teste',
                    useObjective: 'teste',
                    imagePath: 'teste',
                    cep: 'teste',
                    street: 'teste',
                    number: 'teste',
                    complement: 'teste',
                    validatedMail: false,
                    quota: {
                        pointCloudQuotaMB: 100,
                        imageSizeQuotaMB: 200,
                        BIMSizeQuotaMB: 300,
                        pointCloudUsedMB: 50,
                        imageUsedMB: 100,
                        BIMUsedMB: 150,
                    },
                };
                const newDemoUser = new validationUserModel_1.UserModel(demoUser);
                yield newDemoUser.save();
                console.log('Usuário de demonstração criado com sucesso.');
            }
            else {
                console.log('Usuário de demonstração já existe.');
            }
        }
        catch (error) {
            console.error('Erro ao criar usuário de demonstração:', error);
            throw error;
        }
    });
}
exports.createDemoUserService = createDemoUserService;
