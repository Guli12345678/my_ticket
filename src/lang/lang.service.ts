import { Injectable } from "@nestjs/common";
import { CreateLangDto } from "./dto/create-lang.dto";
import { UpdateLangDto } from "./dto/update-lang.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Lang } from "./entities/lang.entity";
import { Model } from "mongoose";

@Injectable()
export class LangService {
  constructor(
    @InjectModel(Lang.name) private readonly langModel: Model<Lang>
  ) {}
  create(createLangDto: CreateLangDto) {
    return this.langModel.create(createLangDto);
  }

  findAll() {
    return this.langModel.find();
  }

  findOne(id: string) {
    return this.langModel.findById(id);
  }

  update(id: string, updateLangDto: UpdateLangDto) {
    return this.langModel.findByIdAndUpdate(id, updateLangDto);
  }

  remove(id: string) {
    return this.langModel.findByIdAndDelete(id);
  }
}
