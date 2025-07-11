import { Module } from "@nestjs/common";
import { PaymentMethodService } from "./payment_method.service";
import { PaymentMethodController } from "./payment_method.controller";
import { MongooseModule } from "@nestjs/mongoose";
import {
  PaymentMethod,
  PaymentMethodSchema,
} from "./entities/payment_method.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PaymentMethod.name,
        schema: PaymentMethodSchema,
      },
    ]),
  ],
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService],
})
export class PaymentMethodModule {}
