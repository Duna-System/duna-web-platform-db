import { ErrorMessages } from 'duna-web-platform-error-defs'
import { IUsers } from '../../interfaces'
import { UserModel } from '../validationUserModel'


export async function updateCustomerId(
    email: string,
    updates: Partial<IUsers>
): Promise<IUsers | null> {
    try {
        const existingUser = await UserModel.findOne({ email: email });

        if (!existingUser) {
            return null;
        }

        if (updates.customerId) {
            existingUser.customerId = updates.customerId;
        }

        if (updates.paymentInfo) {
            const paymentInfoUpdates = updates.paymentInfo;
            if (paymentInfoUpdates.customerId) {
                existingUser.paymentInfo.customerId = paymentInfoUpdates.customerId;
            }
            if (paymentInfoUpdates.plan) {
                existingUser.paymentInfo.plan = paymentInfoUpdates.plan;
            }
            if (paymentInfoUpdates.expirationDate) {
                existingUser.paymentInfo.expirationDate = paymentInfoUpdates.expirationDate;
            }
        }

        await existingUser.save();

        return existingUser;
    } catch (error) {
        console.error('Error in updateUserService:', error);
        const err = ErrorMessages.InternalServerError;
        err.Details = 'Error updating user data.';
        throw err;
    }
}