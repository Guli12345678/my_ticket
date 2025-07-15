import mongoose from "mongoose";

export class CreateSeatDto {
  sector: number;
  row_number: number;
  number: number;
  venue_id: mongoose.Schema.Types.ObjectId;
  seat_type_id: mongoose.Schema.Types.ObjectId;
  location_in_schema: string;
}
