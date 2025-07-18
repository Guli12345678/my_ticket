import {
  BadRequestException,
  Injectable,
  NotFoundException,
  NotImplementedException,
} from "@nestjs/common";
import { CreateSeatDto } from "./dto/create-seat.dto";
import { UpdateSeatDto } from "./dto/update-seat.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Seat } from "./entities/seat.entity";
import { isValidObjectId, Model } from "mongoose";
import { Venue } from "../venue/entities/venue.entity";
import { SeatType } from "../seat_type/entities/seat_type.entity";

@Injectable()
export class SeatService {
  constructor(
    @InjectModel(Seat.name) private seatModel: Model<Seat>,
    @InjectModel(Venue.name) private venueModel: Model<Venue>,
    @InjectModel(SeatType.name) private seatTypeModel: Model<SeatType>
  ) {}
  async create(createSeatDto: CreateSeatDto) {
    const { venue_id, seat_type_id } = createSeatDto;
    if (!isValidObjectId(venue_id)) {
      throw new BadRequestException("Venue Id notogri");
    }
    if (!isValidObjectId(seat_type_id)) {
      throw new BadRequestException("seat_type Id notogri");
    }
    const venue = await this.venueModel.findById(venue_id);
    const seat_type = await this.seatTypeModel.findById(seat_type_id);
    if (!venue || !seat_type) {
      throw new NotFoundException("Bunday venue yoki seat_type topilmadi");
    }
    const seat = await this.seatModel.create(createSeatDto);
    await this.venueModel.findByIdAndUpdate(venue_id, {
      $push: { seat: seat._id },
    });
    await this.seatTypeModel.findByIdAndUpdate(seat_type_id, {
      $push: { seat: seat._id },
    });
    return seat;
  }

  findAll() {
    return this.seatModel.find().populate("venue_id").populate("seat_type_id");
  }

  async findOne(id: string) {
    const seat = await this.seatModel
      .findById(id)
      .populate("venue_id")
      .populate("seat_type_id");
    if (!seat) {
      throw new NotFoundException("Seat not found");
    }
    return seat;
  }

  async update(id: string, updateSeatDto: UpdateSeatDto) {
    const seat = await this.seatModel.findByIdAndUpdate(id, updateSeatDto, {
      new: true,
    });
    if (!seat) {
      throw new NotFoundException("Seat not found");
    }
    return seat;
  }

  async remove(id: string) {
    const seat = await this.seatModel.findByIdAndDelete(id);
    if (!seat) {
      throw new NotFoundException("Seat not found");
    }
    return seat;
  }
}
