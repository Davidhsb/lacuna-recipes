import {IsNotEmpty, IsString } from "@nestjs/class-validator";

export class CreateIngredientDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  unit: string;
}
export default CreateIngredientDto;