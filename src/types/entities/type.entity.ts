import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type TypesDocument = HydratedDocument<Type>;

@Schema({ versionKey: false, timestamps: false })
export class Type {
  @Prop()
  name: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Venue" }],
    default: [],
  })
  venues: mongoose.Types.ObjectId[];
}

export const TypesSchema = SchemaFactory.createForClass(Type);
