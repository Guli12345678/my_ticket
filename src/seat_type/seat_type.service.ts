import { Injectable } from "@nestjs/common";
import { CreateSeatTypeDto } from "./dto/create-seat_type.dto";
import { UpdateSeatTypeDto } from "./dto/update-seat_type.dto";
import { InjectModel } from "@nestjs/mongoose";
import { SeatType } from "./entities/seat_type.entity";
import { Model } from "mongoose";

@Injectable()
export class SeatTypeService {
  constructor(
    @InjectModel(SeatType.name) private readonly seatTypeModel: Model<SeatType>
  ) {}
  create(createSeatTypeDto: CreateSeatTypeDto) {
    return this.seatTypeModel.create(createSeatTypeDto);
  }

  findAll() {
    return this.seatTypeModel.find().populate("seat")
  }

  findOne(id: string) {
    return this.seatTypeModel.findById(id);
  }

  update(id: string, updateSeatTypeDto: UpdateSeatTypeDto) {
    return this.seatTypeModel.findByIdAndUpdate(id, updateSeatTypeDto);
  }

  remove(id: string) {
    return this.seatTypeModel.findByIdAndDelete(id);
  }
}
