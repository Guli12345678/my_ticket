import {
  Body,
  Controller,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { LoginAdminDto } from "../admin/dto/login-admin.dto";
import { log } from "console";
import { Request, Response } from "express";
import { CreateCustomerDto } from "../customers/dto/create-customer.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("signup")
  async signup(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.registerAdmin(createAdminDto);
  }

  @HttpCode(200)
  @Post("signin")
  signin(
    @Body() loginAdminDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.loginAdmin(loginAdminDto, res);
  }

  @Post("signout")
  adminSignout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.logoutAdmin(req, res);
  }

  @Post("refresh")
  adminRefresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.refreshAdminToken(req, res);
  }
  @Post("signup-customer")
  async signupCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return this.authService.registerCustomer(createCustomerDto);
  }

  @HttpCode(200)
  @Post("signin-customer")
  signinCustomer(
    @Body() loginAdminDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.loginCustomer(loginAdminDto, res);
  }

  @Post("signout-customer")
  cusotmerSignout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.logoutCustomer(req, res);
  }

  @Post("refresh-customer")
  customerRefresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshCustomerToken(req, res);
  }
}
