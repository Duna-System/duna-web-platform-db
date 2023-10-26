import { IUsers } from '../../interfaces';
export declare function updateUser(userId: string, updates: Partial<IUsers>): Promise<IUsers | null>;
