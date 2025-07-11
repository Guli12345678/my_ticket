import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type AdminDocument = HydratedDocument<Admin>;

@Schema({ versionKey: false, timestamps: false })
export class Admin {
  @Prop()
  full_name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  phone: string;

  @Prop()
  hashed_password: string;

  @Prop()
  hashed_refresh_token: string;

  @Prop({ default: true })
  is_active: boolean;

  @Prop({ default: false })
  is_creator: boolean;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
