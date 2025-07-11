import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type RegionDocument = HydratedDocument<Region>;

@Schema({ versionKey: false, timestamps: false })
export class Region {
  @Prop()
  name: string;
}

export const RegionSchema = SchemaFactory.createForClass(Region);
