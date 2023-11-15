import { ErrorMessages, IError } from 'duna-web-platform-error-defs'
import { checkConnectionStatus } from '../../connection'
import { entityModel } from '../validationEntityModel'
import { IEntityDb } from '../../interfaces'

export class EntityService {
    protected model = entityModel
    protected configure() {}

    public async insert(entity: IEntityDb): Promise<IEntityDb> {
        //Check if mongoDB is connected
        checkConnectionStatus()

        const entity_record = new this.model(entity)
        await entity_record.save()

        return entity_record.toJSON<IEntityDb>()
    }

    public async get(entity_id: string): Promise<IEntityDb> {
        //Check if mongoDB is connected
        checkConnectionStatus()

        const entity_record = await this.model.findById(entity_id).lean().exec()

        if (!entity_record) {
            const err = ErrorMessages.EntityDoesNotExist
            throw err
        }

        return entity_record
    }

    public async getByName(
        project_id: string,
        entity_name: string
    ): Promise<IEntityDb> {
        //Check if mongoDB is connected
        checkConnectionStatus()

        const entity_record = await this.model
            .findOne({ projectId: project_id, name: entity_name })
            .lean()
            .exec()

        if (!entity_record) {
            const err = ErrorMessages.EntityDoesNotExist
            throw err
        }

        return entity_record
    }

    public async update(entity: IEntityDb): Promise<IEntityDb> {
        //Check if mongoDB is connected
        checkConnectionStatus()

        const entity_record = await this.model
            .findByIdAndUpdate(entity._id, entity, {
                new: true,
            })
            .lean()
            .exec()

        if (!entity_record) {
            const err = ErrorMessages.EntityDoesNotExist
            throw err
        }

        return entity_record
    }

    public async remove(entity_id: string) {
        //Check if mongoDB is connected
        checkConnectionStatus()

        const exists = await this.exists(entity_id)
        if (!exists) {
            const err = ErrorMessages.EntityDoesNotExist
            throw err
        }

        await this.model.findByIdAndRemove(entity_id)
    }

    public async removeAllFromUser(user_id: string) {
        //Check if mongoDB is connected
        checkConnectionStatus()

        await this.model.deleteMany({ user_id: user_id })
    }

    public async exists(entity_id: string): Promise<boolean> {
        //Check if mongoDB is connected
        checkConnectionStatus()

        const exists =
            (await this.model.exists({ _id: entity_id }).lean().exec()) != null
        return exists
    }

    public async existsWithName(
        project_id: string,
        entity_name: string
    ): Promise<boolean> {
        //Check if mongoDB is connected
        checkConnectionStatus()

        const project = await this.model
            .findOne({ projectId: project_id, name: entity_name })
            .lean()
            .exec()
        return project != null
    }

    public async listAllFromProject(project_id: string): Promise<IEntityDb[]> {
        //Check if mongoDB is connected
        checkConnectionStatus()

        const entities: IEntityDb[] = await this.model
            .find({ proje: project_id })
            .lean()
            .exec()
        return entities
    }

    public async assignParentName(
        project_id: string,
        entity_name: string,
        parent_entity_name: string
    ) {
        // Check if entity exist.
        const child_entity = await this.getByName(project_id, entity_name)

        if (!(await this.existsWithName(project_id, parent_entity_name))) {
            {
                const err: IError = ErrorMessages.EntityDoesNotExist
                err.Details = `Parent Name: ${parent_entity_name}`
                throw err
            }
        }

        child_entity.parentName = parent_entity_name

        this.update(child_entity)
    }
    /**
     * Promote entity
     * @param project_id
     * @param entity_name
     */
    public async promoteEntity(project_id: string, entity_name: string) {
        // Check if entity exist.
        const child_entity = await this.getByName(project_id, entity_name)

        if (child_entity.parentName === undefined) {
            const err: IError = ErrorMessages.InternalServerError
            err.Details =
                'Entity is not a chilld, or does not have parent property.'
            throw err
        }

        const entity = await this.model.findOne({
            projectId: project_id,
            name: entity_name,
        })

        entity!.parentName = undefined
        await entity!.save()
    }
}
