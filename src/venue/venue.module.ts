import { Module } from "@nestjs/common";
import { VenueService } from "./venue.service";
import { VenueController } from "./venue.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Venue, VenueSchema } from "./entities/venue.entity";
import { Region, RegionSchema } from "../region/entities/region.entity";
import { District, DistrictSchema } from "../district/entities/district.entity";
import {
  VenuePhoto,
  VenuePhotoSchema,
} from "../venue_photo/entities/venue_photo.entity";
import { Type, TypesSchema } from "../types/entities/type.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Venue.name,
        schema: VenueSchema,
      },
      {
        name: Region.name,
        schema: RegionSchema,
      },
      {
        name: District.name,
        schema: DistrictSchema,
      },
      {
        name: VenuePhoto.name,
        schema: VenuePhotoSchema,
      },
      {
        name: Type.name,
        schema: TypesSchema,
      },
    ]),
  ],
  controllers: [VenueController],
  providers: [VenueService],
})
export class VenueModule {}
