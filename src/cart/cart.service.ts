import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateCartDto } from "./dto/create-cart.dto";
import { UpdateCartDto } from "./dto/update-cart.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Cart } from "./entities/cart.entity";
import { isValidObjectId, Model } from "mongoose";
import { Customer } from "../customers/entities/customer.entity";
import { TicketStatus } from "../ticket_status/entities/ticket_status.entity";

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
    @InjectModel(TicketStatus.name) private statusModel: Model<TicketStatus>
  ) {}
  async create(createCartDto: CreateCartDto) {
    const { customer_id, status_id } = createCartDto;
    if (!isValidObjectId(customer_id)) {
      throw new BadRequestException("Bu customer id notogri");
    }
    const customer = await this.customerModel.findById(customer_id);
    if (!customer) {
      throw new NotFoundException("Bunday customer topilmadi");
    }
    if (!isValidObjectId(status_id)) {
      throw new BadRequestException("Bu status id notogri");
    }
    const status = await this.statusModel.findById(status_id);
    if (!status) {
      throw new NotFoundException("Bunday status topilmadi");
    }
    const cart = await this.cartModel.create(createCartDto);
    await this.customerModel.findByIdAndUpdate(customer_id, {
      $push: { cart: cart._id },
    });
    return cart;
  }

  findAll() {
    return this.cartModel.find().populate("status_id");
  }

  findOne(id: number) {
    return this.cartModel.findById(id);
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return this.cartModel.findByIdAndUpdate(id, updateCartDto);
  }

  remove(id: number) {
    return this.cartModel.findByIdAndDelete(id);
  }
}
