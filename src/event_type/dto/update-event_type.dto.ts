import { PartialType } from "@nestjs/swagger";
import { CreateEventTypeDto } from "./create-event_type.dto";

export class UpdateEventTypeDto {
  name?: string;
  parent_event_type_id?: string;
}
