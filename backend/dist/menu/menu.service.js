"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let MenuService = class MenuService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllItems() {
        try {
            let includeChildren = {};
            let currentInclude = includeChildren;
            for (let i = 0; i < 4; i++) {
                currentInclude['subMenus'] = { include: {} };
                currentInclude['subMenus'].include['parent'] = { include: {} };
                currentInclude = currentInclude['subMenus'].include;
            }
            return this.prisma.menu.findMany({
                where: {
                    parentId: null,
                },
                include: { ...includeChildren },
            });
        }
        catch (e) {
            return [];
        }
    }
    async createItem(data) {
        try {
            const res = await this.prisma.menu.create({
                data,
                include: {
                    subMenus: {
                        include: {
                            parent: true,
                        },
                    },
                    parent: true,
                },
            });
            return { success: true, data: res };
        }
        catch (e) {
            return { success: false, data: e };
        }
    }
    async updateItem(id, data) {
        try {
            const res = await this.prisma.menu.update({
                where: { id },
                data,
            });
            return { success: true, data: res };
        }
        catch (e) {
            return { success: false, data: e };
        }
    }
    async removeItem(id) {
        try {
            const res = await this.prisma.menu.delete({
                where: { id },
            });
            return { success: true };
        }
        catch (e) {
            return { success: false };
        }
    }
};
exports.MenuService = MenuService;
exports.MenuService = MenuService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MenuService);
//# sourceMappingURL=menu.service.js.map