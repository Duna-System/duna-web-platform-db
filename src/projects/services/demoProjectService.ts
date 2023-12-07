import { projectModel } from '../validationProjectsModel'
import { IProjectDb, ProjectAccessType, ProjectStatus } from '../../interfaces'
export async function createDemoProject(): Promise<void> {
    try {
        const existingDemoProject = await projectModel.findOne({
            _id: '5b9a1d40-28f9-4991-9a95-7bc72afad8fD',
        })
        if (!existingDemoProject) {
            const demoProject: IProjectDb = {
                _id: '5b9a1d40-28f9-4991-9a95-7bc72afad8fD',
                user_id: '9dd80d4a-5592-49cd-9fdf-96d16b1d6a72',
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
