import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from "@nestjs/common";
import { EventTypeService } from "./event_type.service";
import { CreateEventTypeDto } from "./dto/create-event_type.dto";
import { UpdateEventTypeDto } from "./dto/update-event_type.dto";

@Controller("event-type")
export class EventTypeController {
  constructor(private readonly eventTypeService: EventTypeService) {}

  @Post()
  create(@Body() dto: CreateEventTypeDto) {
    return this.eventTypeService.create(dto);
  }

  @Get()
  findAll() {
    return this.eventTypeService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.eventTypeService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateEventTypeDto) {
    return this.eventTypeService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.eventTypeService.remove(id);
  }

  @Get("children/:parentId")
  findChildren(@Param("parentId") parentId: string) {
    return this.eventTypeService.findChildren(parentId);
  }
}
