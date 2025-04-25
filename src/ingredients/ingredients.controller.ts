import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import CreateIngredientDto from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) { }

  @Post()
  create(
    @Body() data: CreateIngredientDto,
  ) {
    return this.ingredientsService.createIngredient(data)
  }

  @Get()
  findAllByRecipeId(
  ) {
    return this.ingredientsService.getAllIngredients();
  }

  @Get(":id")
  findOne(
    @Param("id", ParseIntPipe) id: number,
  ) {
    return this.ingredientsService.getIngredientById(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() data: UpdateIngredientDto
  ) {
    return this.ingredientsService.updateIngredient(id, data);
  }

  @Delete(":id")
  delete(
    @Param("id", ParseIntPipe) id: number,
  ) {
    return this.ingredientsService.deleteIngredient(id);
  }


}
