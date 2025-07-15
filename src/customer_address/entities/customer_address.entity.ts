import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import * as mongoose from "mongoose";
import { Customer } from "../../customers/entities/customer.entity";
import { District } from "../../district/entities/district.entity";
import { Region } from "../../region/entities/region.entity";

export type CustomerAddressDocument = HydratedDocument<CustomerAddress>;

@Schema()
export class CustomerAddress {
  @Prop()
  name: string;

  @Prop()
  street: string;

  @Prop()
  house: string;

  @Prop()
  flat: number;

  @Prop()
  location: string;

  @Prop()
  post_index: string;

  @Prop()
  info: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  })
  customer_id: Customer;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "District",
  })
  district_id: District;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Region",
  })
  region_id: Region;
}

export const CustomerAddressSchema =
  SchemaFactory.createForClass(CustomerAddress);
