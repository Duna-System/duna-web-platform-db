import { ErrorMessages } from 'duna-web-platform-error-defs'
import { IOrganizationDb } from '../../interfaces'
import { checkConnectionStatus } from '../../connection'
import { organizationModel } from '../validationOrgModel'
import { UserModel } from '../../users/validationUserModel'

export class OrganizationService {
    protected model = organizationModel
    protected configure() {}

    public async insert(organization: IOrganizationDb): Promise<IOrganizationDb> {
        //Check if mongoDB is connected
        checkConnectionStatus()

        const organization_record = new this.model(organization)
        await organization_record.save()

        return organization_record.toJSON<IOrganizationDb>()
    }

    public async get(organization_id: string): Promise<IOrganizationDb> {
        //Check if mongoDB is connected
        checkConnectionStatus()

        const organization_record = await this.model
            .findById(organization_id)
            .lean()
            .exec()

        if (!organization_record) {
            const err = ErrorMessages.OrganizationDoesNotExist
            err.Details = `Organization '${organization_id}' not found'`
            throw err
        }

        return organization_record
    }

    public async getPopulated(organization_id: string): Promise<IOrganizationDb> {
        //Check if mongoDB is connected
        checkConnectionStatus()

        const organization_record = await this.model
            .findById(organization_id)
            .populate({
                path: 'members.user',
                model: UserModel,
                select: '_id name lastName email',
            })
            .lean()
            .exec()

        if (!organization_record) {
            const err = ErrorMessages.OrganizationDoesNotExist
            err.Details = `Organization '${organization_id}' not found'`
            throw err
        }

        return organization_record
    }

    public async update(organization: IOrganizationDb): Promise<IOrganizationDb> {
        //Check if mongoDB is connected
        checkConnectionStatus()

        const organization_record = await this.model.findByIdAndUpdate(
            organization._id,
            organization,
            {
                new: true,
            }
        )

        if (!organization_record) {
            const err = ErrorMessages.OrganizationDoesNotExist
            err.Details = `Organization '${organization._id}' not found'`
            throw err
        }

        return organization_record.toJSON<IOrganizationDb>()
    }

    public async remove(organization_id: string) {
        //Check if mongoDB is connected
        checkConnectionStatus()

        const exists = await this.exists(organization_id)
        if (!exists) {
            const err = ErrorMessages.OrganizationDoesNotExist
            err.Details = `Organization '${organization_id}' not found'`
            throw err
        }

        await this.model.findByIdAndRemove(organization_id)
    }

    public async exists(organization_id: string): Promise<boolean> {
        //Check if mongoDB is connected
        checkConnectionStatus()

        const exists =
            (await this.model.exists({ _id: organization_id }).lean().exec()) !=
            null
        return exists
    }

    public async listAllFromUser(
        user_id: string
    ): Promise<Array<IOrganizationDb>> {
        //Check if mongoDB is connected
        checkConnectionStatus()

        const organizations = await this.model
            .find({ 'members.user': user_id })
            .select('_id name members')
            .lean()
            .exec()
        return organizations
    }
}
