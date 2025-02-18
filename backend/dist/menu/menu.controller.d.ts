import { MenuService } from './menu.service';
import { Prisma } from '@prisma/client';
export declare class MenuController {
    private readonly menuService;
    constructor(menuService: MenuService);
    getAll(): Promise<({} & {
        id: string;
        name: string;
        parentId: string | null;
        depth: number;
        createdAt: Date;
    })[]>;
    create(data: Prisma.MenuCreateInput): Promise<{
        success: boolean;
        data: any;
    }>;
    update(id: string, data: Prisma.MenuUpdateInput): Promise<{
        success: boolean;
        data: any;
    }>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
