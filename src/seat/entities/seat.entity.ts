import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import * as mongoose from "mongoose";
import { SeatType } from "../../seat_type/entities/seat_type.entity";
import { Venue } from "../../venue/entities/venue.entity";

export type SeatDocument = HydratedDocument<Seat>;

@Schema()
export class Seat {
  @Prop({ required: true })
  sector: number;

  @Prop({ required: true })
  row_number: number;

  @Prop({ required: true })
  number: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Venue",
    required: true,
  })
  venue_id: Venue;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "SeatType",
    required: true,
  })
  seat_type_id: SeatType;

  @Prop({ required: true })
  location_in_schema: string;
}

export const SeatSchema = SchemaFactory.createForClass(Seat);
