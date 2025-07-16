import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EventService } from "./event.service";
import { EventController } from "./event.controller";
import { Event, EventSchema } from "./entities/event.entity";
import { Venue, VenueSchema } from "../venue/entities/venue.entity";
import { Lang, LangSchema } from "../lang/entities/lang.entity";
import {
  HumanCategory,
  HumanCategorySchema,
} from "../human_category/entities/human_category.entity";
import {
  EventType,
  EventTypeSchema,
} from "../event_type/entities/event_type.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Event.name,
        schema: EventSchema,
      },
      {
        name: Venue.name,
        schema: VenueSchema,
      },
      {
        name: Lang.name,
        schema: LangSchema,
      },
      {
        name: HumanCategory.name,
        schema: HumanCategorySchema,
      },
      {
        name: EventType.name,
        schema: EventTypeSchema,
      },
    ]),
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
