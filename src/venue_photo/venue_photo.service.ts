import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateVenuePhotoDto } from "./dto/create-venue_photo.dto";
import { UpdateVenuePhotoDto } from "./dto/update-venue_photo.dto";
import { InjectModel } from "@nestjs/mongoose";
import { VenuePhoto } from "./entities/venue_photo.entity";
import { isValidObjectId, Model } from "mongoose";
import { Venue } from "../venue/entities/venue.entity";

@Injectable()

export class VenuePhotoService {
  constructor(
    @InjectModel(VenuePhoto.name) private venuePhotoModel: Model<VenuePhoto>,
    @InjectModel(Venue.name) private venueModel: Model<Venue>
  ) {}
  async create(createVenuePhotoDto: CreateVenuePhotoDto) {
    const { venue_id } = createVenuePhotoDto;
    if (!isValidObjectId(venue_id)) {
      throw new BadRequestException("Venue Id notogri");
    }
    const venue = await this.venueModel.findById(venue_id);
    if (!venue) {
      throw new NotFoundException("Bunday venue topilmadi");
    }
    const venue_photo = await this.venuePhotoModel.create(createVenuePhotoDto);
    await this.venueModel.findByIdAndUpdate(venue_id, {
      $push: { venue_photo: venue_photo._id },
    });
    return venue_photo;
  }

  findAll() {
    return this.venuePhotoModel.find().populate("venue_id");
  }

  findOne(id: number) {
    return `This action returns a #${id} venuePhoto`;
  }

  update(id: number, updateVenuePhotoDto: UpdateVenuePhotoDto) {
    return `This action updates a #${id} venuePhoto`;
  }

  remove(id: number) {
    return `This action removes a #${id} venuePhoto`;
  }
}
