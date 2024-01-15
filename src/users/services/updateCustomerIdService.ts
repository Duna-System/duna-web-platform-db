import { ErrorMessages } from 'duna-web-platform-error-defs'
import { IUsers } from '../../interfaces'
import { UserModel } from '../validationUserModel'

//atualizar novos campos do paymentInfo
export async function updateCustomerId(
    email: string,
    updates: Partial<IUsers>
): Promise<IUsers | null> {
    try {
        const existingUser = await UserModel.findOne({ email: email })

        if (!existingUser) {
            return null
        }
        if (updates.customerId) existingUser.customerId = updates.customerId

        await existingUser.save()

        return existingUser
    } catch (error) {
        console.error('Error in updateUserService:', error)
        const err = ErrorMessages.InternalServerError
        err.Details = 'Error updating user data.'
        throw err
    }
}
