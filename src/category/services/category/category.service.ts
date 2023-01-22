/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/category/models/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async getAllCategories(): Promise<CategoryEntity[]> {
  const response = await this.categoryRepository.find()
    return response;
  }

  async setIntRandomArray() {
    const DocumentsCategoriesNumber = this.categoryRepository.count();
    const categoriesNumber = (await DocumentsCategoriesNumber) - 1;
    const intRandomArray = [];

    while (intRandomArray.length < 10) {
      const intRandomTemporary =
        Math.floor(Math.random() * (await categoriesNumber)) + 1;

      if (intRandomArray.indexOf(intRandomTemporary) === -1)
        intRandomArray.push(intRandomTemporary);
    }

    return intRandomArray;
  }

  async getTopCategories() {
    const intRandomArray = await this.setIntRandomArray();
    const listExistingCategories = await this.getAllCategories();
    const listTopCategories = [];

    if (listExistingCategories.length >= 10) {
      for (let i = 0; i < intRandomArray.length; i++) {
        listTopCategories.push(listExistingCategories[intRandomArray[i]]);
      }
      return listTopCategories;
    } else {
      return listExistingCategories;
    }
  }

  async getCategoryDescriptionById(id: any) {
    // eslint-disable-next-line prettier/prettier
    const category = await this.categoryRepository.findOneByOrFail({ _id: id });
    const categoryDescription = category.name;
    return categoryDescription;
  }

  getAllSubcategories(parentId) {
    const listSubcategories = this.categoryRepository.findBy({
      parent_id: parentId,
    });

    return listSubcategories;
  }
}
