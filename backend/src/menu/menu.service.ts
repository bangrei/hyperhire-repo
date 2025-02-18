import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

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
    } catch (e) {
      return [];
    }
  }

  async createItem(data: Prisma.MenuCreateInput) {
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
    } catch (e) {
      return { success: false, data: e };
    }
  }
  async updateItem(id: string, data: Prisma.MenuUpdateInput) {
    try {
      const res = await this.prisma.menu.update({
        where: { id },
        data,
      });
      return { success: true, data: res };
    } catch (e) {
      return { success: false, data: e };
    }
  }

  async removeItem(id: string) {
    try {
      const res = await this.prisma.menu.delete({
        where: { id },
      });
      return { success: true };
    } catch (e) {
      return { success: false };
    }
  }
}
