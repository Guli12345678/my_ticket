import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type LangDocument = HydratedDocument<Lang>;

@Schema({ versionKey: false, timestamps: false })
export class Lang {
  @Prop()
  name: string;
}

export const LangSchema = SchemaFactory.createForClass(Lang);
