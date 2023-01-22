/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryService } from 'src/category/services/category/category.service';

@ApiTags('Categories Module')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/all_categories')
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({
    status: 200,
    description: 'All categories',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  async findall() {
    try {
      const listOfAllCategories = await this.categoryService.getAllCategories();
      return {
        data: listOfAllCategories,
        status: true,
        message: 'All categories list',
      };
    } catch (error) {
      return {
        data: null,
        status: true,
        message: 'An error occured',
      };
    }
  }

  @Get('/top_categories')
  @ApiOperation({ summary: 'Get the top categories, Or Random of 10 ' })
  @ApiResponse({
    status: 200,
    description: 'All Top categories',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  async getTopCategories() {
    try {
      const listTopCategories = await this.categoryService.getTopCategories();
      return {
        data: listTopCategories,
        status: true,
        message: 'All top categories list',
      };
    } catch (error) {
      return {
        data: null,
        status: false,
        message: 'An error occured',
      };
    }
  }

  @Get('/all_subcategories/:parent_id')
  @ApiOperation({
    summary: 'Get the subcategories of a category or of a subcategory',
  })
  @ApiResponse({
    status: 200,
    description: 'All subcategories of a category or of a subcategory',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  async getAllSubcategories(@Param('parent_id') parentId: string) {
    // eslint-disable-next-line prettier/prettier
    const categoryName = await this.categoryService.getCategoryDescriptionById(parentId);

    try {
      // eslint-disable-next-line prettier/prettier
      const listSubcategories = await this.categoryService.getAllSubcategories(parentId);
      return {
        data: listSubcategories,
        status: true,
        message: 'All subcategories list of ' + categoryName,
      };
    } catch (error) {
      return {
        data: null,
        status: false,
        message:
          'An error occured while fetching subcategories of ' + categoryName,
      };
    }
  }
}
