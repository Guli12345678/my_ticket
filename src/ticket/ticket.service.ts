import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, isValidObjectId } from "mongoose";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { UpdateTicketDto } from "./dto/update-ticket.dto";
import { Ticket } from "./entities/ticket.entity";
import { Event } from "../event/entities/event.entity";
import { Seat } from "../seat/entities/seat.entity";
import { TicketStatus } from "../ticket_status/entities/ticket_status.entity";

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket.name) private readonly ticketModel: Model<Ticket>,
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
    @InjectModel(Seat.name) private readonly seatModel: Model<Seat>,
    @InjectModel(TicketStatus.name)
    private readonly statusModel: Model<TicketStatus>
  ) {}

  async create(createTicketDto: CreateTicketDto) {
    const { event_id, seat_id, price, service_fee, status_id, ticket_type } =
      createTicketDto;
    if (!isValidObjectId(event_id)) {
      throw new BadRequestException("event_id is invalid");
    }
    if (!isValidObjectId(seat_id)) {
      throw new BadRequestException("seat_id is invalid");
    }
    if (!isValidObjectId(status_id)) {
      throw new BadRequestException("status_id is invalid");
    }
    if (typeof price !== "number" || price < 0) {
      throw new BadRequestException("price is invalid");
    }
    if (typeof service_fee !== "number" || service_fee < 0) {
      throw new BadRequestException("service_fee is invalid");
    }
    if (!ticket_type || typeof ticket_type !== "string") {
      throw new BadRequestException("ticket_type is invalid");
    }
    const event = await this.eventModel.findById(event_id);
    if (!event) {
      throw new NotFoundException("Event not found");
    }
    const seat = await this.seatModel.findById(seat_id);
    if (!seat) {
      throw new NotFoundException("Seat not found");
    }
    const status = await this.statusModel.findById(status_id);
    if (!status) {
      throw new NotFoundException("Status not found");
    }
    const ticket = await this.ticketModel.create(createTicketDto);
    await this.eventModel.findByIdAndUpdate(event_id, {
      $push: { tickets: ticket._id },
    });
    return ticket;
  }

  findAll() {
    return this.ticketModel
      .find()
      .populate("event_id")
      .populate("seat_id")
      .populate("status_id");
  }

  findOne(id: string) {
    return this.ticketModel
      .findById(id)
      .populate("event_id")
      .populate("seat_id")
      .populate("status_id");
  }

  update(id: string, updateTicketDto: UpdateTicketDto) {
    return this.ticketModel.findByIdAndUpdate(id, updateTicketDto);
  }

  remove(id: string) {
    return this.ticketModel.findByIdAndDelete(id);
  }
}
