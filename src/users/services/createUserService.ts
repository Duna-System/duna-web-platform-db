import { UserModel } from '../validationUserModel'
import { IUsers } from '../../interfaces'
import { v4 as uuidv4 } from 'uuid'
import { ErrorMessages, IError } from 'duna-web-platform-error-defs'

export async function createUserService(user: IUsers): Promise<IUsers> {
    try {
        const existingUser = await UserModel.findOne({ email: user.email })

        if (existingUser) {
            const err: IError = ErrorMessages.ResourceExists
            throw err
        }

        const newUser = new UserModel({
            _id: uuidv4(),
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            actingField: user.actingField,
            phoneNumber: user.phoneNumber,
            postalCode: user.postalCode,
            useObjective: user.useObjective,
            imagePath: user.imagePath,
            street: user.street,
            number: user.number,
            complement: user.complement,
            quota: {
                BIMSizeQuotaMB: 5000,
                pointCloudQuotaMB: 5000,
                imageSizeQuotaMB: 5000,
                BIMUsedMB: 0,
                imageUsedMB: 0,
                pointCloudUsedMB: 0,
            },
        })

        const savedUser = await newUser.save()

        return savedUser
    } catch (error) {
        if (error !== ErrorMessages.ResourceExists) {
            error = ErrorMessages.InternalServerError
            ;(error as IError).Details = 'Possibly wrong data schema.'
        }
        throw error
    }
}
