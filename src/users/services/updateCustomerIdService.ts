import { ErrorMessages } from 'duna-web-platform-error-defs'
import { IUsers } from '../../interfaces'
import { UserModel } from '../validationUserModel'


export async function updateCustomerId(
    email: string,
    updates: Partial<IUsers['paymentInfo']>
  ): Promise<IUsers | null> {
    try {
      const filter = { email };
      const update = {
        $set: {
          'paymentInfo.customerId': updates.customerId,
          'paymentInfo.plan': updates.plan,
          'paymentInfo.expirationDate': updates.expirationDate,
        },
      };
  
      const options = { new: true }; 
  
      const updatedUser = await UserModel.findOneAndUpdate(filter, update, options);
  
      if (!updatedUser) {
        const err = ErrorMessages.UserNotFound.Message
        throw err;
      }
  
      return updatedUser;
    } catch (error) {
      console.error('Error in updateCustomerId:', error);
      const err = ErrorMessages.InternalServerError;
      err.Details = 'Error updating user data.';
      throw err;
    }
  }
  