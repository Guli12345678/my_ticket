import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Venue } from "../../venue/entities/venue.entity";
import { Type } from "../../types/entities/type.entity";

@Schema({ versionKey: false, timestamps: false })
export class VenueType {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Venue", required: true })
  venue_id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Type", required: true })
  type_id: mongoose.Schema.Types.ObjectId;
}

export const VenueTypeSchema = SchemaFactory.createForClass(VenueType);
