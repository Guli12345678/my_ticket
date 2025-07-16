import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateCartItemDto } from "./dto/create-cart_item.dto";
import { UpdateCartItemDto } from "./dto/update-cart_item.dto";
import { InjectModel } from "@nestjs/mongoose";
import { CartItem } from "./entities/cart_item.entity";
import { isValidObjectId, Model } from "mongoose";
import { Ticket } from "../ticket/entities/ticket.entity";
import { Cart } from "../cart/entities/cart.entity";

@Injectable()
export class CartItemService {
  constructor(
    @InjectModel(CartItem.name) private cartItemModel: Model<CartItem>,
    @InjectModel(Ticket.name) private ticketModel: Model<Ticket>,
    @InjectModel(Cart.name) private cartModel: Model<Cart>
  ) {}
  async create(createCartItemDto: CreateCartItemDto) {
    const { ticket_id, cart_id } = createCartItemDto;
    if (!isValidObjectId(ticket_id)) {
      throw new BadRequestException("ticket_id is invlalid");
    }
    if (!isValidObjectId(cart_id)) {
      throw new BadRequestException("cart_id is invlalid");
    }
    const ticket = await this.ticketModel.findById(ticket_id);
    const cart = await this.cartModel.findById(cart_id);
    if (!ticket) {
      throw new NotFoundException("Bunday ticket topilmadi");
    }
    if (!cart) {
      throw new NotFoundException("Bunday cart topilmadi");
    }
    const cart_item = await this.cartItemModel.create(createCartItemDto);
    await this.cartModel.findByIdAndUpdate(cart_id, {
      $push: { items: cart_item._id },
    });
    return cart_item;
  }

  findAll() {
    return this.cartItemModel.find().populate("ticket_id").populate("cart_id");
  }

  findOne(id: number) {
    return `This action returns a #${id} cartItem`;
  }

  update(id: number, updateCartItemDto: UpdateCartItemDto) {
    return `This action updates a #${id} cartItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} cartItem`;
  }
}
