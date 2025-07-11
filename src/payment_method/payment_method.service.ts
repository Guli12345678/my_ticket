import { Injectable } from "@nestjs/common";
import { CreatePaymentMethodDto } from "./dto/create-payment_method.dto";
import { UpdatePaymentMethodDto } from "./dto/update-payment_method.dto";
import { InjectModel } from "@nestjs/mongoose";
import { PaymentMethod } from "./entities/payment_method.entity";
import { Model } from "mongoose";

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectModel(PaymentMethod.name)
    private readonly paymentMethodModel: Model<PaymentMethod>
  ) {}
  create(createPaymentMethodDto: CreatePaymentMethodDto) {
    return this.paymentMethodModel.create(createPaymentMethodDto);
  }

  findAll() {
    return this.paymentMethodModel.find();
  }

  findOne(id: string) {
    return this.paymentMethodModel.findById(id);
  }

  update(id: string, updatePaymentMethodDto: UpdatePaymentMethodDto) {
    return this.paymentMethodModel.findByIdAndUpdate(
      id,
      updatePaymentMethodDto
    );
  }

  remove(id: string) {
    return this.paymentMethodModel.findByIdAndDelete(id);
  }
}
