export class CreateBookingDto {
  customer_id: string;
  seat_id: string;
  booking_date?: Date;
  status_id: string;
}
