import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EventType, EventTypeSchema } from "./entities/event_type.schema";
import { EventTypeService } from "./event_type.service";
import { EventTypeController } from "./event_type.controller";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: EventType.name,
        schema: EventTypeSchema,
      },
    ]),
  ],
  providers: [EventTypeService],
  controllers: [EventTypeController],
})
export class EventTypeModule {}
