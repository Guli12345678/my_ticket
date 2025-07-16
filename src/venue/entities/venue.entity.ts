import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { District } from "../../district/entities/district.entity";
import { Region } from "../../region/entities/region.entity";
import { Seat } from "../../seat/entities/seat.entity";
import { Type } from "../../types/entities/type.entity";

export type VenueDocument = HydratedDocument<Venue>;

@Schema({ versionKey: false, timestamps: false })
export class Venue {
  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop()
  location: string;

  @Prop()
  site: string;

  @Prop()
  phone: string;

  @Prop()
  schema: string;

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

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "VenuePhoto" }],
    default: [],
  })
  venue_photo: Types.ObjectId[];
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seat",
  })
  seat: Seat[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Type" }],
    default: [],
  })
  type: Types.ObjectId[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    default: [],
  })
  events: Types.ObjectId[];
}

export const VenueSchema = SchemaFactory.createForClass(Venue);
