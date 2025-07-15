import {
  BadRequestException,
  Injectable,
  NotFoundException,
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
    const region = this.regionSchema.findById(region_id);
    const district = this.regionSchema.findById(district_id);
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
      .populate("seat")
      .populate("region_id")
      .populate("district_id");
  }

  findOne(id: number) {
    return `This action returns a #${id} venue`;
  }

  update(id: number, updateVenueDto: UpdateVenueDto) {
    return `This action updates a #${id} venue`;
  }

  remove(id: number) {
    return `This action removes a #${id} venue`;
  }
}
