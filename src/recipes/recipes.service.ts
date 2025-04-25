import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import createRecipeDto from './dto/create-recipe.dto';
import { IngredientsController } from '../ingredients/ingredients.controller';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(
    private prisma: PrismaService,

  ) { }

  async getAllRecipes() {
    const recipes = await this.prisma.recipe.findMany({
      include: {
        ingredients: {
          select: {
            quantity: true,
            ingredient: true,
          }
        },
      }
    })
      .catch((error) => {
        throw new Error(`Error to find recipe: ${error.message}`);
      })

    return recipes;
  }

  async getRecipeById(id: number) {
    const recipe = await this.prisma.recipe.findUnique({
      where: {
        id: id,
      },
      include: {
        ingredients: {
          select: {
            quantity: true,
            ingredient: true,
          }
        },
      }
    })
      .catch((error) => {
        throw new Error(`Error to find recipe: ${error.message}`);
      })

    return recipe
  }

  async createRecipe(data: createRecipeDto) {
    const { title, instructions, ingredients } = data;

    await this.prisma.recipe.create({
      data: {
        title,
        instructions,
        ingredients: {
          create: ingredients.map((i) => ({
            ingredient: {
              connect: { id: i.ingredientId },
            },
            quantity: i.quantity,
          }))
        }
      },
      include: {
        ingredients: {
          include: {
            ingredient: true,
          }
        }
      }
    })
      .catch((error) => {
        throw new Error(`Error creating recipe: ${error.message}`);
      })
    return "Recipe created successfully";
  }


  async updateRecipe(id: number, data: UpdateRecipeDto) {
    const { title, instructions, ingredients } = data;

    await this.prisma.$transaction(async (prisma) => {
      await prisma.recipe.update({
        where: { id },
        data: {
          title,
          instructions,
        },
      });

      await prisma.recipeIngredient.deleteMany({
        where: { recipeId: id },
      });

      await prisma.recipe.update({
        where: { id },
        data: {
          ingredients: {
            create: ingredients.map((i) => ({
              ingredient: {
                connect: { id: i.ingredientId },
              },
              quantity: i.quantity,
            })),
          },
        },
        include: {
          ingredients: {
            include: {
              ingredient: true,
            },
          },
        },
      });
    })
    .catch((error) => {
      throw new Error(`Error updating recipe: ${error.message}`);
    })

    return 'Recipe updated successfully';
  }


  async deleteRecipe(id: number) {
    await this.prisma.$transaction(async (prisma) => {
      await prisma.recipeIngredient.deleteMany({
        where: {
          recipeId: id,
        }
      })
      await prisma.recipe.delete({
        where: {
          id: id,
        }
      })
    })
    .catch((error) => {
      throw new Error(`Error deleting recipe: ${error.message}`);
    })
    return "Recipe deleted successfully";
  }
}
