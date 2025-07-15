import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateCustomerAddressDto } from "./dto/create-customer_address.dto";
import { UpdateCustomerAddressDto } from "./dto/update-customer_address.dto";
import { InjectModel } from "@nestjs/mongoose";
import { CustomerAddress } from "./entities/customer_address.entity";
import { isValidObjectId, Model } from "mongoose";
import { Customer } from "../customers/entities/customer.entity";
import { District } from "../district/entities/district.entity";
import { Region } from "../region/entities/region.entity";

@Injectable()
export class CustomerAddressService {
  constructor(
    @InjectModel(CustomerAddress.name)
    private customerAddressModel: Model<CustomerAddress>,
    @InjectModel(Customer.name)
    private customerModel: Model<Customer>,
    @InjectModel(Region.name)
    private regionModel: Model<Region>,
    @InjectModel(District.name)
    private districtModel: Model<District>
  ) {}
  async create(createCustomerAddressDto: CreateCustomerAddressDto) {
    const { customer_id, region_id, district_id } = createCustomerAddressDto;
    if (!isValidObjectId(customer_id)) {
      throw new BadRequestException("Customer Id notogri");
    }
    if (!isValidObjectId(region_id)) {
      throw new BadRequestException("region Id notogri");
    }
    if (!isValidObjectId(district_id)) {
      throw new BadRequestException("district Id notogri");
    }
    const customer = await this.customerModel.findById(customer_id);
    if (!customer) {
      throw new NotFoundException("Bunday customer yoq");
    }
    const region = this.regionModel.findById(region_id);



    
    const district = this.districtModel.findById(district_id);
    if (!region || !district) {
      throw new NotFoundException("Bunday region yoki district topilmadi");
    }
    const address = await this.customerAddressModel.create(
      createCustomerAddressDto
    );
    await this.customerModel.findByIdAndUpdate(customer_id, {
      $push: { address: address._id },
    });
    return address;
  }

  findAll() {
    return this.customerAddressModel
      .find()
      .populate("customer_id")
      .populate("region_id")
      .populate("district_id");
  }

  findOne(id: number) {
    return `This action returns a #${id} customerAddress`;
  }

  update(id: number, updateCustomerAddressDto: UpdateCustomerAddressDto) {
    return `This action updates a #${id} customerAddress`;
  }

  remove(id: number) {
    return `This action removes a #${id} customerAddress`;
  }
}
