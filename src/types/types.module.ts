import { Module } from "@nestjs/common";
import { TypesService } from "./types.service";
import { TypesController } from "./types.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Type, TypesSchema } from "./entities/type.entity";
import { Venue, VenueSchema } from "../venue/entities/venue.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Type.name,
        schema: TypesSchema,
      },
      {
        name: Venue.name,
        schema: VenueSchema,
      },
    ]),
  ],
  controllers: [TypesController],
  providers: [TypesService],
})
export class TypesModule {}
