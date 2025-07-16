import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, isValidObjectId } from "mongoose";
import { Booking, BookingDocument } from "./entities/booking.entity";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";
import { Customer } from "../customers/entities/customer.entity";
import { Seat } from "../seat/entities/seat.entity";

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
    @InjectModel(Seat.name) private seatModel: Model<Seat>
  ) {}

  async create(createBookingDto: CreateBookingDto) {
    const { customer_id, seat_id, status_id } = createBookingDto;
    if (!isValidObjectId(customer_id)) {
      throw new BadRequestException("Invalid customer_id");
    }
    if (!isValidObjectId(seat_id)) {
      throw new BadRequestException("Invalid seat_id");
    }
    if (!isValidObjectId(status_id)) {
      throw new BadRequestException("Invalid status_id");
    }
    const customer = await this.customerModel.findById(customer_id);
    if (!customer) {
      throw new NotFoundException("Customer not found");
    }
    const seat = await this.seatModel.findById(seat_id);
    if (!seat) {
      throw new NotFoundException("Seat not found");
    }
    const status = await this.seatModel.findById(seat_id);
    if (!status) {
      throw new NotFoundException("Status not found");
    }
    const booking = await this.bookingModel.create(createBookingDto);
    await this.customerModel.findByIdAndUpdate(customer_id, {
      $push: { bookings: booking._id },
    });
    return booking;
  }

  async findAll() {
    return this.bookingModel
      .find()
      .populate("customer_id")
      .populate("seat_id")
      .populate("status_id");
  }

  async findOne(id: string) {
    const booking = await this.bookingModel
      .findById(id)
      .populate("customer_id")
      .populate("seat_id");
    if (!booking) throw new NotFoundException("Booking not found");
    return booking;
  }

  async update(id: string, updateBookingDto: UpdateBookingDto) {
    const booking = await this.bookingModel.findByIdAndUpdate(
      id,
      updateBookingDto,
      { new: true }
    );
    if (!booking) throw new NotFoundException("Booking not found");
    return booking;
  }

  async remove(id: string) {
    const booking = await this.bookingModel.findByIdAndDelete(id);
    if (!booking) throw new NotFoundException("Booking not found");
    return booking;
  }
}
