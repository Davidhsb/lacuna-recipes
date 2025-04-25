import { Module } from '@nestjs/common';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [RecipesController],
  providers: [RecipesService],
  imports: [PrismaModule],
})
export class RecipesModule {}
