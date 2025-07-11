import { Body, Controller, HttpCode, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { LoginAdminDto } from "../admin/dto/login-admin.dto";
import { log } from "console";
import { Response } from "express";

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
}
