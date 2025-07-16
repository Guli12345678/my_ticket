import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import * as mongoose from "mongoose";

export type CartDocument = HydratedDocument<Cart>;

@Schema()
export class Cart {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  })
  customer_id: mongoose.Schema.Types.ObjectId;
  @Prop()
  createdAt: string;
  @Prop()
  finishedAt: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "TicketStatus"
  })
  status_id: mongoose.Schema.Types.ObjectId;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
