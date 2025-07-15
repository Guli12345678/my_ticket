import { Injectable } from "@nestjs/common";
import { CreateTypeDto } from "./dto/create-type.dto";
import { UpdateTypeDto } from "./dto/update-type.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Type } from "./entities/type.entity";
import { Venue } from "../venue/entities/venue.entity";
import { Model } from "mongoose";

@Injectable()
export class TypesService {
  constructor(
    @InjectModel(Type.name) private readonly typesModel: Model<Type>,
    @InjectModel(Venue.name) private readonly venueModel: Model<Venue>
  ) {}
  create(createTypeDto: CreateTypeDto) {
    return this.typesModel.create(createTypeDto);
  }

  findAll() {
    return this.typesModel.find().populate("venues");
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

  async linkVenueAndType(venueId: string, typeId: string) {
    await this.typesModel.findByIdAndUpdate(typeId, {
      $push: { venue: venueId },
    });
    await this.venueModel.findByIdAndUpdate(venueId, {
      $push: { types: typeId },
    });
    return { message: "Venue and Type linked with $push." };
  }
}
