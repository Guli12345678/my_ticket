import { Module } from "@nestjs/common";
import { VenueTypesService } from "./venue_types.service";
import { VenueTypesController } from "./venue_types.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { VenueType, VenueTypeSchema } from "./entities/venue_type.entity";
import { Venue, VenueSchema } from "../venue/entities/venue.entity";
import { Type, TypesSchema } from "../types/entities/type.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: VenueType.name,
        schema: VenueTypeSchema,
      },
      {
        name: Venue.name,
        schema: VenueSchema,
      },
      {
        name: Type.name,
        schema: TypesSchema,
      },
    ]),
  ],
  controllers: [VenueTypesController],
  providers: [VenueTypesService],
})
export class VenueTypesModule {}
