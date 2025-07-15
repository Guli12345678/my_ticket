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
import { CustomersModule } from './customers/customers.module';
import { MailModule } from './mail/mail.module';
import { DistrictModule } from './district/district.module';
import { VenueModule } from './venue/venue.module';
import { VenuePhotoModule } from './venue_photo/venue_photo.module';
import { SeatModule } from './seat/seat.module';
import { CustomerCardModule } from './customer_card/customer_card.module';
import { VenueTypesModule } from './venue_types/venue_types.module';
import { CustomerAddressModule } from './customer_address/customer_address.module';
import { CartModule } from './cart/cart.module';

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
    CustomersModule,
    MailModule,
    DistrictModule,
    VenueModule,
    VenuePhotoModule,
    SeatModule,
    CustomerCardModule,
    VenueTypesModule,
    CustomerAddressModule,
    CartModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
