/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { IProjectDb } from '../../interfaces';
export declare class ProjectService {
    protected model: import("mongoose").Model<IProjectDb, {}, {}, {}, import("mongoose").Document<unknown, {}, IProjectDb> & IProjectDb & Required<{
        _id: string;
    }>, any>;
    protected configure(): void;
    insert(project: IProjectDb): Promise<IProjectDb>;
    get(project_id: string, user_id: string): Promise<IProjectDb>;
    getPopulated(project_id: string, user_id: string): Promise<IProjectDb>;
    update(project: IProjectDb): Promise<IProjectDb>;
    remove(project_id: string, user_id: string): Promise<void>;
    removeAllFromUser(user_id: string): Promise<void>;
    exists(project_id: string, user_id: string): Promise<boolean>;
    existsWithName(user_id: string, project_name: string): Promise<boolean>;
    listAllFromUser(user_id: string): Promise<IProjectDb[]>;
    listAllFromUserPopulated(user_id: string): Promise<IProjectDb[]>;
    listAll(): Promise<IProjectDb[]>;
}
