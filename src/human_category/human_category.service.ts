import { Injectable } from "@nestjs/common";
import { CreateHumanCategoryDto } from "./dto/create-human_category.dto";
import { UpdateHumanCategoryDto } from "./dto/update-human_category.dto";
import { InjectModel } from "@nestjs/mongoose";
import { HumanCategory } from "./entities/human_category.entity";
import { Model } from "mongoose";

@Injectable()
export class HumanCategoryService {
  constructor(
    @InjectModel(HumanCategory.name)
    private readonly humanCategoryModel: Model<HumanCategory>
  ) {}
  create(createHumanCategoryDto: CreateHumanCategoryDto) {
    return this.humanCategoryModel.create(createHumanCategoryDto);
  }

  findAll() {
    return this.humanCategoryModel.find();
  }

  findOne(id: string) {
    return this.humanCategoryModel.findById(id);
  }

  update(id: string, updateHumanCategoryDto: UpdateHumanCategoryDto) {
    return this.humanCategoryModel.findByIdAndUpdate(
      id,
      updateHumanCategoryDto
    );
  }

  remove(id: string) {
    return this.humanCategoryModel.findByIdAndDelete(id);
  }
}
