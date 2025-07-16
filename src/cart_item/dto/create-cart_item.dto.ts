import mongoose from "mongoose";

export class CreateCartItemDto {
  ticket_id: mongoose.Schema.Types.ObjectId;
  cart_id: mongoose.Schema.Types.ObjectId;
}
