import { Module } from "@nestjs/common";
import { CartItemService } from "./cart_item.service";
import { CartItemController } from "./cart_item.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { CartItem, CartItemSchema } from "./entities/cart_item.entity";
import { Cart, CartSchema } from "../cart/entities/cart.entity";
import { Ticket, TicketSchema } from "../ticket/entities/ticket.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CartItem.name,
        schema: CartItemSchema,
      },
      {
        name: Cart.name,
        schema: CartSchema,
      },
      {
        name: Ticket.name,
        schema: TicketSchema,
      },
    ]),
  ],
  controllers: [CartItemController],
  providers: [CartItemService],
})
export class CartItemModule {}
