import { Module } from '@nestjs/common';
import { IngredientsController } from './ingredients.controller';
import { IngredientsService } from './ingredients.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [IngredientsController],
  providers: [IngredientsService],
  imports: [PrismaModule],
})
export class IngredientsModule { }
