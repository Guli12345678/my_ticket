import {
  BadRequestException,
  Injectable,
  NotFoundException,
  NotImplementedException,
} from "@nestjs/common";
import { CreateVenueDto } from "./dto/create-venue.dto";
import { UpdateVenueDto } from "./dto/update-venue.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Venue } from "./entities/venue.entity";
import { isValidObjectId, Model } from "mongoose";
import { Region } from "../region/entities/region.entity";
import { District } from "../district/entities/district.entity";
import { populate } from "dotenv";

@Injectable()
export class VenueService {
  constructor(
    @InjectModel(Venue.name) private venueSchema: Model<Venue>,
    @InjectModel(Region.name) private regionSchema: Model<Venue>,
    @InjectModel(District.name) private districtSchema: Model<District>
  ) {}
  async create(createVenueDto: CreateVenueDto) {
    const { region_id, district_id } = createVenueDto;
    if (!isValidObjectId(region_id)) {
      throw new BadRequestException("Region Id notogri");
    }
    if (!isValidObjectId(district_id)) {
      throw new BadRequestException("District Id notogri");
    }
    const region = await this.regionSchema.findById(region_id);
    const district = await this.districtSchema.findById(district_id);
    if (!region || !district) {
      throw new NotFoundException("Bunday region yoki district topilmadi");
    }
    const venue = await this.venueSchema.create(createVenueDto);
    return venue;
  }

  findAll() {
    return this.venueSchema
      .find()
      .populate("venue_photo")
      .populate("type")
      .populate("events")
      .populate("seat")
      .populate("region_id")
      .populate("district_id");
  }

  async findOne(id: string) {
    const venue = await this.venueSchema
      .findById(id)
      .populate("venue_photo")
      .populate("type")
      .populate("seat")
      .populate("region_id")
      .populate("district_id");
    if (!venue) {
      throw new NotFoundException("Venue not found");
    }
    return venue;
  }

  async update(id: string, updateVenueDto: UpdateVenueDto) {
    const venue = await this.venueSchema.findByIdAndUpdate(id, updateVenueDto, {
      new: true,
    });
    if (!venue) {
      throw new NotFoundException("Venue not found");
    }
    return venue;
  }

  async remove(id: string) {
    const venue = await this.venueSchema.findByIdAndDelete(id);
    if (!venue) {
      throw new NotFoundException("Venue not found");
    }
    return venue;
  }
}
