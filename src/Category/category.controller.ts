import { Controller, Get } from '@nestjs/common';
import { Response } from 'express';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryservice: CategoryService) {}

  @Get('/list')
  getAllCollector() {
    return this.categoryservice.getAllCategorys();
  }
}
