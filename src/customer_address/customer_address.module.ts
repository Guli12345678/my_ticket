import { Module } from "@nestjs/common";
import { CustomerAddressService } from "./customer_address.service";
import { CustomerAddressController } from "./customer_address.controller";
import { MongooseModule } from "@nestjs/mongoose";
import {
  CustomerAddress,
  CustomerAddressSchema,
} from "./entities/customer_address.entity";
import {
  Customer,
  CustomerSchema,
} from "../customers/entities/customer.entity";
import { Region, RegionSchema } from "../region/entities/region.entity";
import { District, DistrictSchema } from "../district/entities/district.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CustomerAddress.name,
        schema: CustomerAddressSchema,
      },
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
      {
        name: Region.name,
        schema: RegionSchema,
      },
      {
        name: District.name,
        schema: DistrictSchema,
      },
    ]),
  ],
  controllers: [CustomerAddressController],
  providers: [CustomerAddressService],
})
export class CustomerAddressModule {}
