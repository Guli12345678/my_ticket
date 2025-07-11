import { Injectable } from "@nestjs/common";
import { CreateTicketStatusDto } from "./dto/create-ticket_status.dto";
import { UpdateTicketStatusDto } from "./dto/update-ticket_status.dto";
import { InjectModel } from "@nestjs/mongoose";
import { TicketStatus } from "./entities/ticket_status.entity";
import { Model } from "mongoose";

@Injectable()
export class TicketStatusService {
  constructor(
    @InjectModel(TicketStatus.name)
    private readonly ticketStatusModel: Model<TicketStatus>
  ) {}
  create(createTicketStatusDto: CreateTicketStatusDto) {
    return this.ticketStatusModel.create(createTicketStatusDto);
  }

  findAll() {
    return this.ticketStatusModel.find();
  }

  findOne(id: string) {
    return this.ticketStatusModel.findById(id);
  }

  update(id: string, updateTicketStatusDto: UpdateTicketStatusDto) {
    return this.ticketStatusModel.findByIdAndUpdate(id, updateTicketStatusDto);
  }

  remove(id: string) {
    return this.ticketStatusModel.findByIdAndDelete(id);
  }
}
