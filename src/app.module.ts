import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { RecipesModule } from './recipes/recipes.module';
import { IngredientsService } from './ingredients/ingredients.service';
import { RecipesService } from './recipes/recipes.service';

@Module({
  imports: [PrismaModule, RecipesModule, IngredientsModule],
  controllers: [AppController],
  providers: [AppService, RecipesService, IngredientsService],
})
export class AppModule {}
