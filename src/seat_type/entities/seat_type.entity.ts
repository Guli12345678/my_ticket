import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Seat } from "../../seat/entities/seat.entity";

export type SeatTypeDocument = HydratedDocument<SeatType>;

@Schema({ versionKey: false, timestamps: false })
export class SeatType {
  @Prop()
  name: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seat",
  })
  seat: Seat[];
}

export const SeatTypeSchema = SchemaFactory.createForClass(SeatType);
