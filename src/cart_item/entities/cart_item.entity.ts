import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import * as mongoose from "mongoose";
import { Cart } from "../../cart/entities/cart.entity";
import { Ticket } from "../../ticket/entities/ticket.entity";

export type CartItemDocument = HydratedDocument<CartItem>;

@Schema()
export class CartItem {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ticket",
  })
  ticket_id: Ticket;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
  })
  cart_id: Cart;
}

export const CartItemSchema = SchemaFactory.createForClass(CartItem);
