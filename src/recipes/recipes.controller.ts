import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import CreateRecipeDto from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Controller('recipes')
export class RecipesController {

  constructor(private readonly recipesService: RecipesService) { }
  
    @Post()
    create(
      @Body() data: CreateRecipeDto,
    ) {
      return this.recipesService.createRecipe(data)
    }
  
    @Get()
    findAllByRecipeId(
    ) {
      return this.recipesService.getAllRecipes();
    }
  
    @Get(":id")
    findOne(
      @Param("id", ParseIntPipe) id: number,
    ) {
      return this.recipesService.getRecipeById;
    }
  
    @Patch(":id")
    update(
      @Param("id", ParseIntPipe) id: number,
      @Body() data: UpdateRecipeDto
    ) {
      return this.recipesService.updateRecipe(id, data);
    }
  
    @Delete(":id")
    delete(
      @Param("id", ParseIntPipe) id: number,
    ) {
      return this.recipesService.deleteRecipe(id);
    }
  
}
