import mongoose from "mongoose";

export class CreateVenueDto {
  name: string;
  address: string;
  location: string;
  site: string;
  phone: string;
  schema: string;
  region_id: mongoose.Schema.Types.ObjectId;
  district_id: mongoose.Schema.Types.ObjectId;
}
