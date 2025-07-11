import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TypesDocument = HydratedDocument<Types>;

@Schema({ versionKey: false, timestamps: false })
export class Types {
  @Prop()
  name: string;
}

export const TypesSchema = SchemaFactory.createForClass(Types);
