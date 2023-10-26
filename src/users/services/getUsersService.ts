import {UserModel} from '../validationUserModel'
import { ErrorMessages } from 'duna-web-platform-error-defs';

export async function getUsersService() {
  try {
    const user = await UserModel.find();
    return user;
  } catch (error) {
    const err = ErrorMessages.InternalServerError;
    err.Details = 'Internal server Error ';
    throw err;
  }
}
