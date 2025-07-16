import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TicketService } from "./ticket.service";
import { TicketController } from "./ticket.controller";
import { Ticket, TicketSchema } from "./entities/ticket.entity";
import { Event, EventSchema } from "../event/entities/event.entity";
import { Seat, SeatSchema } from "../seat/entities/seat.entity";
import {
  TicketStatus,
  TicketStatusSchema,
} from "../ticket_status/entities/ticket_status.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ticket.name, schema: TicketSchema },
      { name: Event.name, schema: EventSchema },
      { name: Seat.name, schema: SeatSchema },
      { name: TicketStatus.name, schema: TicketStatusSchema },
    ]),
  ],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
