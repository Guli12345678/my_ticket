import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EventType, EventTypeDocument } from "./entities/event_type.schema";
import { CreateEventTypeDto } from "./dto/create-event_type.dto";
import { UpdateEventTypeDto } from "./dto/update-event_type.dto";

@Injectable()
export class EventTypeService {
  constructor(
    @InjectModel(EventType.name)
    private eventTypeModel: Model<EventTypeDocument>
  ) {}

  async create(dto: CreateEventTypeDto) {
    return this.eventTypeModel.create(dto);
  }

  async findAll() {
    return this.eventTypeModel.find().populate("parent_event_type_id");
  }

  async findOne(id: string) {
    const eventType = await this.eventTypeModel
      .findById(id)
      .populate("parent_event_type_id");
    if (!eventType) throw new NotFoundException("Event type not found");
    return eventType;
  }

  async update(id: string, dto: UpdateEventTypeDto) {
    const eventType = await this.eventTypeModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!eventType) throw new NotFoundException("Event type not found");
    return eventType;
  }

  async remove(id: string) {
    const eventType = await this.eventTypeModel.findByIdAndDelete(id);
    if (!eventType) throw new NotFoundException("Event type not found");
    return eventType;
  }

  async findChildren(parentId: string) {
    return this.eventTypeModel.find({ parent_event_type_id: parentId });
  }
}
