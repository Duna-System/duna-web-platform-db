import { entityModel } from '../validationEntityModel'
import { EntityType, IEntityDb, ShareGroupType } from '../../interfaces'
export async function createDemoEntity(): Promise<void> {
    try {
        const existingDemoEntity = await entityModel.findOne({
            _id: '123',
        })
        if (!existingDemoEntity) {
            const DemoEntity: IEntityDb = {
                _id: '123',
                projectId: '123',
                type: EntityType.PointCloud,
                name: 'entityName',
                location:
                    '/projects/9dd80d4a-5592-49cd-9fdf-96d16b1d6a72/5b9a1d40-28f9-4991-9a95-7bc72afad8fD/example',
                sizeMB: 10,
                shareGroup: ShareGroupType.Public,
            }
            const newDemoEntity = new entityModel(DemoEntity)
            await newDemoEntity.save()
            console.log('Entidade de demonstração criado com sucesso.')
        } else {
            console.log('Entidade de demonstração já existe.')
        }
    } catch (error) {
        console.error('Erro ao criar Entidade de demonstração:', error)
        throw error
    }
}
