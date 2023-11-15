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
import { IEntityDb } from '../../interfaces';
export declare class EntityService {
    protected model: import("mongoose").Model<IEntityDb, {}, {}, {}, import("mongoose").Document<unknown, {}, IEntityDb> & IEntityDb & Required<{
        _id: string;
    }>, any>;
    protected configure(): void;
    insert(entity: IEntityDb): Promise<IEntityDb>;
    get(entity_id: string): Promise<IEntityDb>;
    getByName(project_id: string, entity_name: string): Promise<IEntityDb>;
    update(entity: IEntityDb): Promise<IEntityDb>;
    remove(entity_id: string): Promise<void>;
    removeAllFromUser(user_id: string): Promise<void>;
    exists(entity_id: string): Promise<boolean>;
    existsWithName(project_id: string, entity_name: string): Promise<boolean>;
    listAllFromProject(project_id: string): Promise<IEntityDb[]>;
    assignParentName(project_id: string, entity_name: string, parent_entity_name: string): Promise<void>;
}
