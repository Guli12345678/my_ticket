import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type HumanCategoryDocument = HydratedDocument<HumanCategory>;

@Schema({ versionKey: false, timestamps: false })
export class HumanCategory {
  @Prop()
  name: string;
  @Prop()
  start_age: string;
  @Prop()
  finish_age: string;
  @Prop()
  gender: string;
}

export const HumanCategorySchema = SchemaFactory.createForClass(HumanCategory);
