import {
  BadRequestException,
  Injectable,
  NotImplementedException,
  NotFoundException,
} from "@nestjs/common";
import { CreateCustomerCardDto } from "./dto/create-customer_card.dto";
import { UpdateCustomerCardDto } from "./dto/update-customer_card.dto";
import { InjectModel } from "@nestjs/mongoose";
import { CustomerCard } from "./entities/customer_card.entity";
import { isValidObjectId, Model } from "mongoose";
import { Customer } from "../customers/entities/customer.entity";

@Injectable()
export class CustomerCardService {
  constructor(
    @InjectModel(CustomerCard.name)
    private customerCardModel: Model<CustomerCard>,
    @InjectModel(Customer.name)
    private customerModel: Model<Customer>
  ) {}
  async create(createCustomerCardDto: CreateCustomerCardDto) {
    const { customer_id } = createCustomerCardDto;
    if (!isValidObjectId(customer_id)) {
      throw new BadRequestException("Customer Id notogri");
    }
    const customer = await this.customerModel.findById(customer_id);
    if (!customer) {
      throw new BadRequestException("Bunday customer topilmadi");
    }

    const card = await this.customerCardModel.create(createCustomerCardDto);
    await this.customerModel.findByIdAndUpdate(customer_id, {
      $push: { card: card._id },
    });
    return card;
  }

  findAll() {
    return this.customerCardModel.find().populate("customer_id");
  }

  async findOne(id: string) {
    const card = await this.customerCardModel
      .findById(id)
      .populate("customer_id");
    if (!card) {
      throw new NotFoundException("Customer card not found");
    }
    return card;
  }

  async update(id: string, updateCustomerCardDto: UpdateCustomerCardDto) {
    const card = await this.customerCardModel.findByIdAndUpdate(
      id,
      updateCustomerCardDto,
      { new: true }
    );
    if (!card) {
      throw new NotFoundException("Customer card not found");
    }
    return card;
  }

  async remove(id: string) {
    const card = await this.customerCardModel.findByIdAndDelete(id);
    if (!card) {
      throw new NotFoundException("Customer card not found");
    }
    return card;
  }
}
