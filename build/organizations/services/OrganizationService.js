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
exports.OrganizationService = void 0;
const duna_web_platform_error_defs_1 = require("duna-web-platform-error-defs");
const connection_1 = require("../../connection");
const validationOrgModel_1 = require("../validationOrgModel");
const validationUserModel_1 = require("../../users/validationUserModel");
class OrganizationService {
    constructor() {
        this.model = validationOrgModel_1.organizationModel;
    }
    configure() { }
    insert(organization) {
        return __awaiter(this, void 0, void 0, function* () {
            //Check if mongoDB is connected
            (0, connection_1.checkConnectionStatus)();
            const organization_record = new this.model(organization);
            yield organization_record.save();
            return organization_record.toJSON();
        });
    }
    get(organization_id) {
        return __awaiter(this, void 0, void 0, function* () {
            //Check if mongoDB is connected
            (0, connection_1.checkConnectionStatus)();
            const organization_record = yield this.model.findById(organization_id).lean().exec();
            if (!organization_record) {
                const err = duna_web_platform_error_defs_1.ErrorMessages.OrganizationDoesNotExist;
                err.Details = `Organization '${organization_id}' not found'`;
                throw err;
            }
            return organization_record;
        });
    }
    getPopulated(organization_id) {
        return __awaiter(this, void 0, void 0, function* () {
            //Check if mongoDB is connected
            (0, connection_1.checkConnectionStatus)();
            const organization_record = yield this.model
                .findById(organization_id)
                .populate({ path: 'members.user', model: validationUserModel_1.UserModel, select: '_id name lastName email' })
                .lean()
                .exec();
            if (!organization_record) {
                const err = duna_web_platform_error_defs_1.ErrorMessages.OrganizationDoesNotExist;
                err.Details = `Organization '${organization_id}' not found'`;
                throw err;
            }
            return organization_record;
        });
    }
    update(organization) {
        return __awaiter(this, void 0, void 0, function* () {
            //Check if mongoDB is connected
            (0, connection_1.checkConnectionStatus)();
            const organization_record = yield this.model.findByIdAndUpdate(organization._id, organization, {
                new: true,
            });
            if (!organization_record) {
                const err = duna_web_platform_error_defs_1.ErrorMessages.OrganizationDoesNotExist;
                err.Details = `Organization '${organization._id}' not found'`;
                throw err;
            }
            return organization_record.toJSON();
        });
    }
    remove(organization_id) {
        return __awaiter(this, void 0, void 0, function* () {
            //Check if mongoDB is connected
            (0, connection_1.checkConnectionStatus)();
            const exists = yield this.exists(organization_id);
            if (!exists) {
                const err = duna_web_platform_error_defs_1.ErrorMessages.OrganizationDoesNotExist;
                err.Details = `Organization '${organization_id}' not found'`;
                throw err;
            }
            yield this.model.findByIdAndRemove(organization_id);
        });
    }
    exists(organization_id) {
        return __awaiter(this, void 0, void 0, function* () {
            //Check if mongoDB is connected
            (0, connection_1.checkConnectionStatus)();
            const exists = (yield this.model.exists({ _id: organization_id }).lean().exec()) != null;
            return exists;
        });
    }
    listAllFromUser(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            //Check if mongoDB is connected
            (0, connection_1.checkConnectionStatus)();
            const organizations = yield this.model
                .find({ 'members.user': user_id })
                .select('_id name members')
                .lean()
                .exec();
            return organizations;
        });
    }
}
exports.OrganizationService = OrganizationService;
