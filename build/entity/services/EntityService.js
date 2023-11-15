"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityService = void 0;
const duna_web_platform_error_defs_1 = require("duna-web-platform-error-defs");
const connection_1 = require("../../connection");
const validationEntityModel_1 = require("../validationEntityModel");
class EntityService {
    constructor() {
        this.model = validationEntityModel_1.entityModel;
    }
    configure() { }
    insert(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            //Check if mongoDB is connected
            (0, connection_1.checkConnectionStatus)();
            const entity_record = new this.model(entity);
            yield entity_record.save();
            return entity_record.toJSON();
        });
    }
    get(entity_id) {
        return __awaiter(this, void 0, void 0, function* () {
            //Check if mongoDB is connected
            (0, connection_1.checkConnectionStatus)();
            const entity_record = yield this.model.findById(entity_id).lean().exec();
            if (!entity_record) {
                const err = duna_web_platform_error_defs_1.ErrorMessages.EntityDoesNotExist;
                throw err;
            }
            return entity_record;
        });
    }
    getByName(project_id, entity_name) {
        return __awaiter(this, void 0, void 0, function* () {
            //Check if mongoDB is connected
            (0, connection_1.checkConnectionStatus)();
            const entity_record = yield this.model
                .findOne({ projectId: project_id, name: entity_name })
                .lean()
                .exec();
            if (!entity_record) {
                const err = duna_web_platform_error_defs_1.ErrorMessages.EntityDoesNotExist;
                throw err;
            }
            return entity_record;
        });
    }
    update(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            //Check if mongoDB is connected
            (0, connection_1.checkConnectionStatus)();
            const entity_record = yield this.model
                .findByIdAndUpdate(entity._id, entity, {
                new: true,
            })
                .lean()
                .exec();
            if (!entity_record) {
                const err = duna_web_platform_error_defs_1.ErrorMessages.EntityDoesNotExist;
                throw err;
            }
            return entity_record;
        });
    }
    remove(entity_id) {
        return __awaiter(this, void 0, void 0, function* () {
            //Check if mongoDB is connected
            (0, connection_1.checkConnectionStatus)();
            const exists = yield this.exists(entity_id);
            if (!exists) {
                const err = duna_web_platform_error_defs_1.ErrorMessages.EntityDoesNotExist;
                throw err;
            }
            yield this.model.findByIdAndRemove(entity_id);
        });
    }
    removeAllFromUser(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            //Check if mongoDB is connected
            (0, connection_1.checkConnectionStatus)();
            yield this.model.deleteMany({ user_id: user_id });
        });
    }
    exists(entity_id) {
        return __awaiter(this, void 0, void 0, function* () {
            //Check if mongoDB is connected
            (0, connection_1.checkConnectionStatus)();
            const exists = (yield this.model.exists({ _id: entity_id }).lean().exec()) != null;
            return exists;
        });
    }
    existsWithName(project_id, entity_name) {
        return __awaiter(this, void 0, void 0, function* () {
            //Check if mongoDB is connected
            (0, connection_1.checkConnectionStatus)();
            const project = yield this.model
                .findOne({ projectId: project_id, name: entity_name })
                .lean()
                .exec();
            return project != null;
        });
    }
    listAllFromProject(project_id) {
        return __awaiter(this, void 0, void 0, function* () {
            //Check if mongoDB is connected
            (0, connection_1.checkConnectionStatus)();
            const entities = yield this.model
                .find({ proje: project_id })
                .lean()
                .exec();
            return entities;
        });
    }
    assignParentName(project_id, entity_name, parent_entity_name) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if entity exist.
            const child_entity = yield this.getByName(project_id, entity_name);
            if (!(yield this.existsWithName(project_id, parent_entity_name))) {
                {
                    const err = duna_web_platform_error_defs_1.ErrorMessages.EntityDoesNotExist;
                    err.Details = `Parent Name: ${parent_entity_name}`;
                    throw err;
                }
            }
            child_entity.parentName = parent_entity_name;
            this.update(child_entity);
        });
    }
    /**
     * Promote entity
     * @param project_id
     * @param entity_name
     */
    promoteEntity(project_id, entity_name) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if entity exist.
            const child_entity = yield this.getByName(project_id, entity_name);
            if (child_entity.parentName === undefined) {
                const err = duna_web_platform_error_defs_1.ErrorMessages.InternalServerError;
                err.Details = 'Entity is not a chilld, or does not have parent property.';
                throw err;
            }
            const entity = yield this.model.findOne({ projectId: project_id, name: entity_name });
            entity.parentName = undefined;
            yield entity.save();
        });
    }
}
exports.EntityService = EntityService;
