import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { PaymentMethodModule } from './payment_method/payment_method.module';
import { DeliveryMethodModule } from './delivery_method/delivery_method.module';
import { TicketStatusModule } from './ticket_status/ticket_status.module';
import { HumanCategoryModule } from './human_category/human_category.module';
import { LangModule } from './lang/lang.module';
import { TypesModule } from './types/types.module';
import { RegionModule } from './region/region.module';
import { SeatTypeModule } from './seat_type/seat_type.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    AdminModule,
    AuthModule,
    PaymentMethodModule,
    DeliveryMethodModule,
    TicketStatusModule,
    HumanCategoryModule,
    LangModule,
    TypesModule,
    RegionModule,
    SeatTypeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
