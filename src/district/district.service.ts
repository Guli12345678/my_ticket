import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateDistrictDto } from "./dto/create-district.dto";
import { UpdateDistrictDto } from "./dto/update-district.dto";
import { InjectModel } from "@nestjs/mongoose";
import { District } from "./entities/district.entity";
import { isValidObjectId, Model } from "mongoose";
import { Region } from "../region/entities/region.entity";

@Injectable()
export class DistrictService {
  constructor(
    @InjectModel(District.name)
    private districtSchema: Model<District>,
    @InjectModel(Region.name) private regionSchema: Model<Region>
  ) {}
  async create(createDistrictDto: CreateDistrictDto) {
    const { region_id } = createDistrictDto;
    if (!isValidObjectId(region_id)) {
      throw new BadRequestException("Bu region_id notogri");
    }
    const region = await this.regionSchema.findById(region_id);
    if (!region) {
      throw new NotFoundException("Bunday region topilmadi");
    }
    const district = await this.districtSchema.create(createDistrictDto);
    region.districts.push(district);
    await region.save();
    return district;
  }

  findAll() {
    return this.districtSchema.find().populate("region_id");
  }

  findOne(id: number) {
    return `This action returns a #${id} district`;
  }

  update(id: number, updateDistrictDto: UpdateDistrictDto) {
    return `This action updates a #${id} district`;
  }

  remove(id: number) {
    return `This action removes a #${id} district`;
  }
}
