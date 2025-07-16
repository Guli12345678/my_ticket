import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { District } from "../../district/entities/district.entity";
import { Region } from "../../region/entities/region.entity";
import { Seat } from "../../seat/entities/seat.entity";
import { Type } from "../../types/entities/type.entity";
import { Lang } from "../../lang/entities/lang.entity";
import { Venue } from "../../venue/entities/venue.entity";
import { HumanCategory } from "../../human_category/entities/human_category.entity";
import { EventType } from "../../event_type/entities/event_type.schema";
import { Ticket } from "../../ticket/entities/ticket.entity";

export type EventDocument = HydratedDocument<Event>;

@Schema({ versionKey: false, timestamps: false })
export class Event {
  @Prop()
  name: string;

  @Prop()
  photo: string;

  @Prop()
  start_date: Date;

  @Prop()
  start_time: string;

  @Prop()
  finish_date: Date;

  @Prop()
  finish_time: string;

  @Prop()
  info: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "EventType",
  })
  event_type_id: EventType;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "HumanCategory",
  })
  human_category_id: HumanCategory;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Venue",
  })
  venue_id: Venue;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lang",
  })
  lang_id: Lang;

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
    },
  ])
  tickets: Ticket;
}

export const EventSchema = SchemaFactory.createForClass(Event);
