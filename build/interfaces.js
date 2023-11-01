"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityType = exports.ShareGroupType = exports.ProjectAccessType = exports.ProjectStatus = exports.OrganizationMemberRole = void 0;
var OrganizationMemberRole;
(function (OrganizationMemberRole) {
    OrganizationMemberRole["VIEWER"] = "VIEWER";
    OrganizationMemberRole["EDITOR"] = "EDITOR";
    OrganizationMemberRole["ADMIN"] = "ADMIN";
    OrganizationMemberRole["OWNER"] = "OWNER";
})(OrganizationMemberRole || (exports.OrganizationMemberRole = OrganizationMemberRole = {}));
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus["IN_PROGRESS"] = "IN_PROGRESS";
    ProjectStatus["FINISHED"] = "FINISHED";
})(ProjectStatus || (exports.ProjectStatus = ProjectStatus = {}));
var ProjectAccessType;
(function (ProjectAccessType) {
    ProjectAccessType["INTERNAL"] = "INTERNAL";
    ProjectAccessType["PRIVATE"] = "PRIVATE";
})(ProjectAccessType || (exports.ProjectAccessType = ProjectAccessType = {}));
var ShareGroupType;
(function (ShareGroupType) {
    ShareGroupType["Public"] = "public";
    ShareGroupType["Private"] = "private";
})(ShareGroupType || (exports.ShareGroupType = ShareGroupType = {}));
var EntityType;
(function (EntityType) {
    EntityType["PointCloud"] = "clouds";
    EntityType["Image"] = "images";
    EntityType["BIM"] = "bim";
    EntityType["Unknown"] = "unknown";
})(EntityType || (exports.EntityType = EntityType = {}));
