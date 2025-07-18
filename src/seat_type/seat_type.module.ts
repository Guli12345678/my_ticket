import { Module } from "@nestjs/common";
import { SeatTypeService } from "./seat_type.service";
import { SeatTypeController } from "./seat_type.controller";
import { SeatType } from "./entities/seat_type.entity";
import { MongooseModule } from "@nestjs/mongoose";
import { SeatTypeSchema } from "./entities/seat_type.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SeatType.name,
        schema: SeatTypeSchema,
      },
    ]),
  ],
  controllers: [SeatTypeController],
  providers: [SeatTypeService],
})
export class SeatTypeModule {}
