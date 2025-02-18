import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { Prisma } from '@prisma/client';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  getAll() {
    return this.menuService.getAllItems();
  }

  @Post()
  create(@Body() data: Prisma.MenuCreateInput) {
    return this.menuService.createItem(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Prisma.MenuUpdateInput) {
    return this.menuService.updateItem(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.removeItem(id);
  }
}
