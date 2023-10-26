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
exports.ProjectService = void 0;
const duna_web_platform_error_defs_1 = require("duna-web-platform-error-defs");
const validationProjectsModel_1 = require("../validationProjectsModel");
const connection_1 = require("../../connection");
class ProjectService {
    constructor() {
        this.model = validationProjectsModel_1.projectModel;
    }
    configure() { }
    insert(project) {
        return __awaiter(this, void 0, void 0, function* () {
            //Check if mongoDB is connected
            (0, connection_1.checkConnectionStatus)();
            const project_record = new this.model(project);
            yield project_record.save();
            return project_record.toJSON();
        });
    }
    get(project_id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            //Check if mongoDB is connected
            (0, connection_1.checkConnectionStatus)();
            const project_record = yield this.model
                .findOne({ _id: project_id, user_id: user_id })
                .lean()
                .exec();
            if (!project_record) {
                const err = duna_web_platform_error_defs_1.ErrorMessages.ProjectDoesNotExist;
                err.Details = `Project '${project_id}' not found'`;
                throw err;
            }
            return project_record;
        });
    }
    getPopulated(project_id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            //Check if mongoDB is connected
            (0, connection_1.checkConnectionStatus)();
            const project_record = yield this.model
                .findOne({ _id: project_id, user_id: user_id })
                .populate('clouds')
                .populate('bim')
                .populate('images')
                .lean()
                .exec();
            if (!project_record) {
                const err = duna_web_platform_error_defs_1.ErrorMessages.ProjectDoesNotExist;
                err.Details = `Project '${project_id}' not found'`;
                throw err;
            }
            return project_record;
        });
    }
    update(project) {
        return __awaiter(this, void 0, void 0, function* () {
            //Check if mongoDB is connected
            (0, connection_1.checkConnectionStatus)();
            const project_record = yield this.model.findByIdAndUpdate(project._id, project, {
                new: true,
            });
            if (!project_record) {
                const err = duna_web_platform_error_defs_1.ErrorMessages.ProjectDoesNotExist;
                err.Details = `Project '${project._id}' not found'`;
                throw err;
            }
            return project_record.toJSON();
        });
    }
    remove(project_id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            //Check if mongoDB is connected
            (0, connection_1.checkConnectionStatus)();
            const exists = yield this.exists(project_id, user_id);
            if (!exists) {
                const err = duna_web_platform_error_defs_1.ErrorMessages.ProjectDoesNotExist;
                err.Details = `Project '${project_id}' not found'`;
                throw err;
            }
            yield this.model.findByIdAndRemove(project_id);
        });
    }
    removeAllFromUser(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            //Check if mongoDB is connected
            (0, connection_1.checkConnectionStatus)();
            yield this.model.deleteMany({ user_id: user_id });
        });
    }
    exists(project_id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            //Check if mongoDB is connected
            (0, connection_1.checkConnectionStatus)();
            const exists = (yield this.model
                .exists({ _id: project_id, user_id: user_id })
                .lean()
                .exec()) != null;
            return exists;
        });
    }
    existsWithName(user_id, project_name) {
        return __awaiter(this, void 0, void 0, function* () {
            //Check if mongoDB is connected
            (0, connection_1.checkConnectionStatus)();
            const project = yield this.model
                .findOne({ user_id: user_id, name: project_name })
                .lean()
                .exec();
            return project != null;
        });
    }
    listAllFromUser(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            //Check if mongoDB is connected
            (0, connection_1.checkConnectionStatus)();
            const projects = yield this.model
                .find({ user_id: user_id })
                .lean()
                .exec();
            return projects;
        });
    }
    listAllFromUserPopulated(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            //Check if mongoDB is connected
            (0, connection_1.checkConnectionStatus)();
            const projects = yield this.model
                .find({ user_id: user_id })
                .populate('clouds')
                .populate('bim')
                .populate('images')
                .lean()
                .exec();
            return projects;
        });
    }
    listAll() {
        return __awaiter(this, void 0, void 0, function* () {
            //Check if mongoDB is connected
            (0, connection_1.checkConnectionStatus)();
            const projects = yield this.model.find().lean().exec();
            return projects;
        });
    }
}
exports.ProjectService = ProjectService;
