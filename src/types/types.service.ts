import { Injectable } from "@nestjs/common";
import { CreateTypeDto } from "./dto/create-type.dto";
import { UpdateTypeDto } from "./dto/update-type.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Types } from "./entities/type.entity";
import { Model } from "mongoose";

@Injectable()
export class TypesService {
  constructor(
    @InjectModel(Types.name) private readonly typesModel: Model<Types>
  ) {}
  create(createTypeDto: CreateTypeDto) {
    return this.typesModel.create(createTypeDto);
  }

  findAll() {
    return this.typesModel.find();
  }

  findOne(id: string) {
    return this.typesModel.findById(id);
  }

  update(id: string, updateTypeDto: UpdateTypeDto) {
    return this.typesModel.findByIdAndUpdate(id, updateTypeDto);
  }

  remove(id: string) {
    return this.typesModel.findByIdAndDelete(id);
  }
}
