import { ErrorMessages } from 'duna-web-platform-error-defs';
import {UserModel} from '../validationUserModel'

export async function deleteUserService(userId: string) {
  try {
    return await UserModel.findOneAndDelete({ _id: userId });
  } catch (error) {
    const err = ErrorMessages.InternalServerError;
    err.Details = 'Internal server Error ';
    throw err;
  }
}
