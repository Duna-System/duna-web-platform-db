import { ErrorMessages } from 'duna-web-platform-error-defs';
import { checkConnectionStatus } from '../connection';
import { IUsers} from '../interfaces';
import  {UserModel}  from '../users/validationUserModel';

export class UserService {
  protected model = UserModel;
  protected configure() {}

  public async get(user_id?: string, email?: string): Promise<IUsers> {
    //Check if mongoDB is connected
    checkConnectionStatus();

    let user;
    if (user_id) {
      user = await this.model.findById(user_id).lean().exec();
    } else {
      user = await this.model.findOne({ email: email }).lean().exec();
    }

    if (!user) {
      const id = user_id ? user_id : email;
      const err = ErrorMessages.InternalServerError;
      err.Details = `User ${id} not found`;
      throw err;
    }

    return user;
  }
}
