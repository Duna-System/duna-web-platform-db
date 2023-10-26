import { IUsers } from '../../interfaces';
export declare function getUserByEmail(email: string): Promise<IUsers | null>;
export declare function verifyPassword(user: IUsers, password: string): Promise<boolean>;
