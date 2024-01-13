import { IUsers } from "../../interfaces";
export declare function updateCustomerId(email: string, updates: Partial<IUsers>): Promise<IUsers | null>;
