import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UUID } from "crypto";
import mongoose, { HydratedDocument } from "mongoose";
import { CustomerCard } from "../../customer_card/entities/customer_card.entity";
import { CustomerAddress } from "../../customer_address/entities/customer_address.entity";

export type CustomerDocument = HydratedDocument<Customer>;

@Schema({ versionKey: false, timestamps: false })
export class Customer {
  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  phone: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({})
  birth_date: Date;

  @Prop({ enum: ["ayol", "erkak"] })
  gender: string;

  @Prop()
  hashed_password: string;

  @Prop()
  hashed_refresh_token: string;

  @Prop({ default: false })
  is_active: boolean;

  @Prop()
  activation_link: UUID;

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CustomerCard",
    },
  ])
  card: CustomerCard[];

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CustomerAddress",
    },
  ])
  address: CustomerAddress[];
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
