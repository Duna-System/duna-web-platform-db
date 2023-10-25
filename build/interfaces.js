"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityType = exports.ShareGroupType = exports.OrganizationMemberRole = void 0;
var OrganizationMemberRole;
(function (OrganizationMemberRole) {
    OrganizationMemberRole["VIEWER"] = "VIEWER";
    OrganizationMemberRole["EDITOR"] = "EDITOR";
    OrganizationMemberRole["ADMIN"] = "ADMIN";
    OrganizationMemberRole["OWNER"] = "OWNER";
})(OrganizationMemberRole || (exports.OrganizationMemberRole = OrganizationMemberRole = {}));
// export enum ProjectStatus {
//     IN_PROGRESS = 'IN_PROGRESS',
//     FINISHED = 'FINISHED',
// }
// export enum ProjectAccessType {
//     INTERNAL = 'INTERNAL',
//     PRIVATE = 'PRIVATE',
// }
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
