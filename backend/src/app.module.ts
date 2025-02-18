import { Module } from '@nestjs/common';
import { MenuModule } from './menu/menu.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [MenuModule, PrismaModule],
  providers: [PrismaService],
})
export class AppModule {}
