import { Module } from "@nestjs/common";
import { BookingService } from "./booking.service";
import { BookingController } from "./booking.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Booking, BookingSchema } from "./entities/booking.entity";
import {
  Customer,
  CustomerSchema,
} from "../customers/entities/customer.entity";
import { Seat, SeatSchema } from "../seat/entities/seat.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Booking.name,
        schema: BookingSchema,
      },
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
      {
        name: Seat.name,
        schema: SeatSchema,
      },
    ]),
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
