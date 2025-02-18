import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class MenuService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllItems(): Promise<({} & {
        id: string;
        name: string;
        parentId: string | null;
        depth: number;
        createdAt: Date;
    })[]>;
    createItem(data: Prisma.MenuCreateInput): Promise<{
        success: boolean;
        data: any;
    }>;
    updateItem(id: string, data: Prisma.MenuUpdateInput): Promise<{
        success: boolean;
        data: any;
    }>;
    removeItem(id: string): Promise<{
        success: boolean;
    }>;
}
