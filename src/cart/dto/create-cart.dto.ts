import mongoose from "mongoose";

export class CreateCartDto {
  customer_id: mongoose.Schema.Types.ObjectId; // ->Customer
  createdAt: Date;
  finishedAt: Date;
  status_id: mongoose.Schema.Types.ObjectId; // -> ticket_status
}
