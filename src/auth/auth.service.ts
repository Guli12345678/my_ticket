import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { Admin, AdminDocument } from "../admin/schemas/admin.schema";
import { JwtService } from "@nestjs/jwt";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { AdminService } from "../admin/admin.service";
import { LoginAdminDto } from "../admin/dto/login-admin.dto";
import * as bcrypt from "bcrypt";
import { Response } from "express";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService
  ) {}
  async generateTokensAdmin(admin: AdminDocument) {
    const payload = {
      id: admin._id,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEYAdmin,
        expiresIn: process.env.SECRET_TOKEN_TIMEAdmin,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEYAdmin,
        expiresIn: process.env.REFRESH_TOKEN_TIMEAdmin,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async registerAdmin(createAdminDto: CreateAdminDto) {
    const candidate = await this.adminService.findByEmail(createAdminDto.email);

    if (candidate) {
      throw new ConflictException("This admin already exists in the system");
    }

    const newAdmin = await this.adminService.create(createAdminDto);

    return { adminId: newAdmin._id };
  }

  async loginAdmin(loginAdminDto: LoginAdminDto, res: Response) {
    const admin = await this.adminService.findByEmail(loginAdminDto.email);

    if (!admin) {
      throw new UnauthorizedException(
        "This admin does not exist. Check your email and password"
      );
    }

    const isValid = await bcrypt.compare(
      loginAdminDto.password,
      admin.hashed_password
    );

    if (!isValid) {
      throw new UnauthorizedException(
        "Email or password is incorrect. Check your email and password"
      );
    }

    const { accessToken, refreshToken } = await this.generateTokensAdmin(admin);

    admin.hashed_refresh_token = await bcrypt.hash(refreshToken, 7);

    await admin.save();

    res.cookie("refreshToken", refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });

    return { message: "User signed in 🎉", adminId: admin._id, accessToken };
  }
}
