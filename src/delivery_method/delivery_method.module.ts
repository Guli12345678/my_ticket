import { Module } from "@nestjs/common";
import { DeliveryMethodService } from "./delivery_method.service";
import { DeliveryMethodController } from "./delivery_method.controller";
import { MongooseModule } from "@nestjs/mongoose";
import {
  DeliveryMethod,
  DeliveryMethodSchema,
} from "./entities/delivery_method.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DeliveryMethod.name,
        schema: DeliveryMethodSchema,
      },
    ]),
  ],
  controllers: [DeliveryMethodController],
  providers: [DeliveryMethodService],
})
export class DeliveryMethodModule {}
