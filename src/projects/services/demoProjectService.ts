import { projectModel } from '../validationProjectsModel'
import { IProjectDb, ProjectAccessType, ProjectStatus } from '../../interfaces'
export async function createDemoUserService(): Promise<void> {
    try {
        const existingDemoProject = await projectModel.findOne({
            projectId: 'demo@example.com',
        })
        if (!existingDemoProject) {
            const demoProject: IProjectDb = {
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
                status: ProjectStatus.IN_PROGRESS,
                accessType: ProjectAccessType.INTERNAL,
                owner: 'Example',
            }
            const newDemoProject = new projectModel(demoProject)
            await newDemoProject.save()
            console.log('Projeto de demonstração criado com sucesso.')
        } else {
            console.log('Projeto de demonstração já existe.')
        }
    } catch (error) {
        console.error('Erro ao criar Projeto de demonstração:', error)
        throw error
    }
}
