import mongoose from "mongoose";

export class CreateCartDto {
  customer_id: mongoose.Schema.Types.ObjectId;
  createdAt: string;
  finishedAt: string;
  status_id: mongoose.Schema.Types.ObjectId;
}
