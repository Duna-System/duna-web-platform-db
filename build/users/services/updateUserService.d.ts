import { IUsers } from '../../interfaces';
export declare function updateUserService(userId: string, updates: Partial<IUsers>): Promise<IUsers | null>;
