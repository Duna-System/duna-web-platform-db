import { ErrorMessages } from 'duna-web-platform-error-defs';
import {UserModel} from '../validationUserModel'

export async function getOneUserService(_id: string) {
  try {
    const user = await UserModel.findOne({ _id });
    return user;
  } catch (error) {
    const err = ErrorMessages.InternalServerError;
    err.Details = 'Internal server Error ';
    throw err;
  }
}
