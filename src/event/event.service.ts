import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, isValidObjectId } from "mongoose";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { Event } from "./entities/event.entity";
import { Venue } from "../venue/entities/venue.entity";
import { Lang } from "../lang/entities/lang.entity";
import { EventType } from "../event_type/entities/event_type.schema";
import { HumanCategory } from "../human_category/entities/human_category.entity";

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
    @InjectModel(Venue.name) private readonly venueModel: Model<Venue>,
    @InjectModel(Lang.name) private readonly langModel: Model<Lang>,
    @InjectModel(HumanCategory.name)
    private readonly categoryModel: Model<HumanCategory>,
    @InjectModel(EventType.name)
    private readonly eventTypeModel: Model<EventType>
  ) {}

  async create(createEventDto: CreateEventDto) {
    const { event_type_id, venue_id, lang_id, human_category_id } =
      createEventDto;
    if (!isValidObjectId(event_type_id)) {
      throw new BadRequestException("event_type_id is invalid");
    }
    if (!isValidObjectId(venue_id)) {
      throw new BadRequestException("venue_id is invalid");
    }
    if (!isValidObjectId(lang_id)) {
      throw new BadRequestException("lang_id is invalid");
    }
    if (!isValidObjectId(human_category_id)) {
      throw new BadRequestException("human_category_id is invalid");
    }
    const eventType = await this.eventTypeModel.findById(event_type_id);
    if (!eventType) {
      throw new NotFoundException("Event type not found");
    }
    const venue = await this.venueModel.findById(venue_id);
    if (!venue) {
      throw new NotFoundException("Venue not found");
    }
    const lang = await this.langModel.findById(lang_id);
    if (!lang) {
      throw new NotFoundException("Lang not found");
    }
    const humancategory = await this.categoryModel.findById(human_category_id);
    if (!humancategory) {
      throw new NotFoundException("Human category not found");
    }
    const event = await this.eventModel.create(createEventDto);
    await this.venueModel.findByIdAndUpdate(venue_id, {
      $push: { events: event._id },
    });
    return event;
  }

  findAll() {
    return this.eventModel
      .find()
      .populate("event_type_id")
      .populate("venue_id")
      .populate("lang_id")
      .populate("human_category_id");
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
