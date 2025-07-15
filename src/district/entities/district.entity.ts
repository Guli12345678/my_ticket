import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Region } from "../../region/entities/region.entity";

export type DistrictDocument = HydratedDocument<District>;

@Schema({ versionKey: false, timestamps: false })
export class District {
  @Prop()
  name: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Region",
  })
  region_id: Region;
}

export const DistrictSchema = SchemaFactory.createForClass(District);
