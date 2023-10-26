import { ErrorMessages } from 'duna-web-platform-error-defs'
import { IProjectDb } from '../../interfaces'
import { projectModel } from '../validationProjectsModel'
import { checkConnectionStatus } from '../../connection'

export class ProjectService {
    protected model = projectModel
    protected configure() {}

    public async insert(project: IProjectDb): Promise<IProjectDb> {
        //Check if mongoDB is connected
        checkConnectionStatus()

        const project_record = new this.model(project)
        await project_record.save()

        return project_record.toJSON<IProjectDb>()
    }

    public async get(project_id: string, user_id: string): Promise<IProjectDb> {
        //Check if mongoDB is connected
        checkConnectionStatus()

        const project_record = await this.model
            .findOne({ _id: project_id, user_id: user_id })
            .lean()
            .exec()

        if (!project_record) {
            const err = ErrorMessages.ProjectDoesNotExist
            err.Details = `Project '${project_id}' not found'`
            throw err
        }

        return project_record
    }

    public async getPopulated(
        project_id: string,
        user_id: string
    ): Promise<IProjectDb> {
        //Check if mongoDB is connected
        checkConnectionStatus()

        const project_record = await this.model
            .findOne({ _id: project_id, user_id: user_id })
            .populate('clouds')
            .populate('bim')
            .populate('images')
            .lean()
            .exec()

        if (!project_record) {
            const err = ErrorMessages.ProjectDoesNotExist
            err.Details = `Project '${project_id}' not found'`
            throw err
        }

        return project_record
    }

    public async update(project: IProjectDb): Promise<IProjectDb> {
        //Check if mongoDB is connected
        checkConnectionStatus()

        const project_record = await this.model.findByIdAndUpdate(
            project._id,
            project,
            {
                new: true,
            }
        )

        if (!project_record) {
            const err = ErrorMessages.ProjectDoesNotExist
            err.Details = `Project '${project._id}' not found'`
            throw err
        }

        return project_record.toJSON<IProjectDb>()
    }

    public async remove(project_id: string, user_id: string) {
        //Check if mongoDB is connected
        checkConnectionStatus()

        const exists = await this.exists(project_id, user_id)
        if (!exists) {
            const err = ErrorMessages.ProjectDoesNotExist
            err.Details = `Project '${project_id}' not found'`
            throw err
        }

        await this.model.findByIdAndRemove(project_id)
    }

    public async removeAllFromUser(user_id: string) {
        //Check if mongoDB is connected
        checkConnectionStatus()

        await this.model.deleteMany({ user_id: user_id })
    }

    public async exists(project_id: string, user_id: string): Promise<boolean> {
        //Check if mongoDB is connected
        checkConnectionStatus()

        const exists =
            (await this.model
                .exists({ _id: project_id, user_id: user_id })
                .lean()
                .exec()) != null
        return exists
    }

    public async existsWithName(
        user_id: string,
        project_name: string
    ): Promise<boolean> {
        //Check if mongoDB is connected
        checkConnectionStatus()

        const project = await this.model
            .findOne({ user_id: user_id, name: project_name })
            .lean()
            .exec()
        return project != null
    }

    public async listAllFromUser(user_id: string): Promise<IProjectDb[]> {
        //Check if mongoDB is connected
        checkConnectionStatus()

        const projects: IProjectDb[] = await this.model
            .find({ user_id: user_id })
            .lean()
            .exec()
        return projects
    }

    public async listAllFromUserPopulated(
        user_id: string
    ): Promise<IProjectDb[]> {
        //Check if mongoDB is connected
        checkConnectionStatus()

        const projects: IProjectDb[] = await this.model
            .find({ user_id: user_id })
            .populate('clouds')
            .populate('bim')
            .populate('images')
            .lean()
            .exec()
        return projects
    }

    public async listAll(): Promise<IProjectDb[]> {
        //Check if mongoDB is connected
        checkConnectionStatus()

        const projects: IProjectDb[] = await this.model.find().lean().exec()
        return projects
    }
}
