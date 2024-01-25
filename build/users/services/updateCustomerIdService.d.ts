import { IUsers } from '../../interfaces';
export declare function updateCustomerId(email: string, updates: Partial<IUsers['paymentInfo']>): Promise<IUsers | null>;
