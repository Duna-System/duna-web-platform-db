import { UserModel } from '../validationUserModel';
import { IUsers } from '../../interfaces';
export async function createDemoUserService(): Promise<void> {
    try {
        const existingDemoUser = await UserModel.findOne({ email: 'demo@example.com' });
        if (!existingDemoUser) {
            const demoUser: IUsers = {
                _id: "dc168171-2895-40a3-9800-70bf93ac491a",
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
            const newDemoUser = new UserModel(demoUser);
            await newDemoUser.save();
            console.log('Usuário de demonstração criado com sucesso.');
        } else {
            console.log('Usuário de demonstração já existe.');
        }
    } catch (error) {
        console.error('Erro ao criar usuário de demonstração:', error);
        throw error;
    }
}