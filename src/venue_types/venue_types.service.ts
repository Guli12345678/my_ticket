import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateVenueTypeDto } from "./dto/create-venue_type.dto";
import { UpdateVenueTypeDto } from "./dto/update-venue_type.dto";
import { InjectModel } from "@nestjs/mongoose";
import { VenueType } from "./entities/venue_type.entity";
import { isValidObjectId, Model } from "mongoose";
import { Venue } from "../venue/entities/venue.entity";
import { Type } from "../types/entities/type.entity";

@Injectable()
export class VenueTypesService {
  constructor(
    @InjectModel(VenueType.name) private venueTypeModel: Model<VenueType>,
    @InjectModel(Venue.name) private venueSchema: Model<Venue>,
    @InjectModel(Type.name) private readonly typesModel: Model<Type>
  ) {}
  async create(createVenueTypeDto: CreateVenueTypeDto) {
    const { venue_id, type_id } = createVenueTypeDto;
    if (!isValidObjectId(venue_id)) {
      throw new BadRequestException("Region Id notogri");
    }
    if (!isValidObjectId(type_id)) {
      throw new BadRequestException("District Id notogri");
    }
    const venue = this.venueSchema.findById(venue_id);
    const type = this.typesModel.findById(type_id);
    if (!venue || !type) {
      throw new NotFoundException("Bunday venue yoki type topilmadi");
    }
    const venue_type = await this.venueTypeModel.create(createVenueTypeDto);
    await this.venueSchema.findByIdAndUpdate(venue_id, {
      $push: { types: venue_type._id },
    });
    await this.typesModel.findByIdAndUpdate(type_id, {
      $push: { venues: venue_type._id },
    });
    return venue_type;
  }

  findAll() {
    return this.venueTypeModel.find().populate("venue_id").populate("type_id");
  }

  findOne(id: number) {
    return `This action returns a #${id} venueType`;
  }

  update(id: number, updateVenueTypeDto: UpdateVenueTypeDto) {
    return `This action updates a #${id} venueType`;
  }

  remove(id: number) {
    return `This action removes a #${id} venueType`;
  }
}
