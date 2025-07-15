import mongoose from "mongoose";

export class CreateVenueTypeDto {
  venue_id: mongoose.Schema.Types.ObjectId;
  type_id: mongoose.Schema.Types.ObjectId;
}
