import { Injectable } from "@nestjs/common";
import { CreateRegionDto } from "./dto/create-region.dto";
import { UpdateRegionDto } from "./dto/update-region.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Region } from "./entities/region.entity";
import { Model } from "mongoose";

@Injectable()
export class RegionService {
  constructor(
    @InjectModel(Region.name) private readonly regionModel: Model<Region>
  ) {}
  create(createRegionDto: CreateRegionDto) {
    return this.regionModel.create(createRegionDto);
  }

  findAll() {
    return this.regionModel.find();
  }

  findOne(id: string) {
    return this.regionModel.findById(id);
  }

  update(id: string, updateRegionDto: UpdateRegionDto) {
    return this.regionModel.findByIdAndUpdate(id, updateRegionDto);
  }

  remove(id: string) {
    return this.regionModel.findByIdAndDelete(id);
  }
}
