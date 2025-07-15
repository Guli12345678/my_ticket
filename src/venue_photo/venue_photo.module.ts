import { Module } from "@nestjs/common";
import { VenuePhotoService } from "./venue_photo.service";
import { VenuePhotoController } from "./venue_photo.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { VenuePhoto, VenuePhotoSchema } from "./entities/venue_photo.entity";
import { Venue, VenueSchema } from "../venue/entities/venue.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: VenuePhoto.name,
        schema: VenuePhotoSchema,
      },
      {
        name: Venue.name,
        schema: VenueSchema,
      },
    ]),
  ],
  controllers: [VenuePhotoController],
  providers: [VenuePhotoService],
})
export class VenuePhotoModule {}
