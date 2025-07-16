import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";
import { TicketStatus } from "../../ticket_status/entities/ticket_status.entity";

@Schema()
export class Booking {
  @Prop({ type: Types.ObjectId, ref: "Customer", required: true })
  customer_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "Seat", required: true })
  seat_id: Types.ObjectId;

  @Prop({ type: Date, default: Date.now })
  booking_date: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "TicketStatus",
  })
  status_id: TicketStatus;
}

export type BookingDocument = Booking & Document;
export const BookingSchema = SchemaFactory.createForClass(Booking);
