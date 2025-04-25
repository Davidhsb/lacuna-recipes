import { IsNotEmpty, IsObject, IsString } from "@nestjs/class-validator";

export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  instructions: string;
  @IsObject()
  @IsNotEmpty()
  ingredients: {
    ingredientId: number;
    quantity: number;
  }[];
}
export default CreateRecipeDto;