import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Customer } from "./entities/customer.entity";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private readonly customerModel: Model<Customer>
  ) {}
  async create(createCustomerDto: CreateCustomerDto) {
    const { password, confirm_password } = createCustomerDto;
    if (password !== confirm_password) {
      throw new BadRequestException("Parollar mos emas!");
    }

    const hashed_password = await bcrypt.hash(password, 7);
    return this.customerModel.create({
      ...createCustomerDto,
      hashed_password,
    });
  }

  findAll() {
    return this.customerModel.find().populate("card").populate("address");
  }

  findOne(id: string) {
    return this.customerModel.findById(id);
  }

  update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return this.customerModel.findByIdAndUpdate(id, updateCustomerDto);
  }

  remove(id: string) {
    return this.customerModel.findByIdAndDelete(id);
  }

  findByEmail(email: string) {
    return this.customerModel.findOne({ email });
  }
}
