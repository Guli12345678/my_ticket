import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema()
export class EventType {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: "EventType", default: null })
  parent_event_type_id: Types.ObjectId | null;
}

export type EventTypeDocument = EventType & Document;
export const EventTypeSchema = SchemaFactory.createForClass(EventType);
