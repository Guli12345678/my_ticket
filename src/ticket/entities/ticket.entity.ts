import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { Event } from "../../event/entities/event.entity";
import { Seat } from "../../seat/entities/seat.entity";
import { TicketStatus } from "../../ticket_status/entities/ticket_status.entity";

export type TicketDocument = HydratedDocument<Ticket>;

@Schema({ versionKey: false, timestamps: false })
export class Ticket {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true })
  event_id: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Seat", required: true })
  seat_id: Types.ObjectId;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number, required: true })
  service_fee: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "TicketStatus",
    required: true,
  })
  status_id: Types.ObjectId;

  @Prop({ type: String, required: true })
  ticket_type: string;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
