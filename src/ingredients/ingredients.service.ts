import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import CreateIngredientDto from './dto/create-ingredient.dto';

@Injectable()
export class IngredientsService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async getAllIngredients() {
    const ingredients = await this.prisma.ingredient.findMany({
    }).catch((error) => {
      throw new Error(`Error to find ingredients: ${error.message}`);
    });
    return ingredients;
  }

  async getIngredientById(id: number) {
    const ingredient = await this.prisma.ingredient.findUnique({
      where: {
        id: id,
      },
    }).catch((error) => {
      throw new Error(`Error to find ingredient: ${error.message}`);
    });
  
    if (!ingredient) {
      throw new Error('Ingredient not found');
    }
  
    return ingredient;
  }

  async createIngredient(data: CreateIngredientDto) {
    await this.prisma.ingredient.create({
      data: {
        name: data.name,
        unit: data.unit,
      }
    })
    .catch((error) => {
      throw new Error(`Error creating ingredient: ${error.message}`);
    })
    return "Ingredient created successfully";
  }

  // Example method to update an ingredient
  async updateIngredient(id: number, data: any) {
    await this.prisma.ingredient.update({
      data: {
        ...data,
      },
      where: {
        id: id,
      }
    })
    .catch((error) => {
      throw new Error(`Error updating ingredient: ${error.message}`);
    })
    return "Ingredients updated successfully";
  }

  // Example method to delete an ingredient
  async deleteIngredient(id: number) {
    await this.prisma.$transaction(async(prisma) => {
      await prisma.recipeIngredient.deleteMany({
        where: {
          ingredientId: id,
        }
      })
      await prisma.ingredient.delete({
        where: {
          id: id,
        },
      })
    })
    .catch((error) => {
      throw new Error(`Error deleting ingredient: ${error.message}`);
    })
    return "Ingredient deleted successfully";
  }
}
