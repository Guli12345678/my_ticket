import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
  UnauthorizedException,
} from "@nestjs/common";
import { Admin, AdminDocument } from "../admin/schemas/admin.schema";
import { JwtService } from "@nestjs/jwt";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { AdminService } from "../admin/admin.service";
import { LoginAdminDto } from "../admin/dto/login-admin.dto";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { CustomersService } from "../customers/customers.service";
import { CustomerDocument } from "../customers/entities/customer.entity";
import { CreateCustomerDto } from "../customers/dto/create-customer.dto";
import { LoginCustomerDto } from "../customers/dto/login-customer.dto";
import { MailService } from "../mail/mail.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService,
    private readonly customerService: CustomersService,
    private readonly mailService: MailService
  ) {}
  async generateTokensAdmin(admin: AdminDocument) {
    const payload = {
      id: admin._id,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
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

    res.cookie("refresh_token", refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });

    return { message: "User signed in 🎉", adminId: admin._id, accessToken };
  }

  async logoutAdmin(req: Request, res: Response) {
    try {
      const refresh_token = req.cookies.refresh_token;
      if (!refresh_token) {
        throw new BadRequestException("Refresh token is required");
      }
      const decoded: any = jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN_SECRET!
      );
      const admin = await this.adminService.findOne(decoded.id);

      if (!admin || !admin.hashed_refresh_token) {
        throw new UnauthorizedException("Admin has no refresh token");
      }
      const isMatch = await bcrypt.compare(
        refresh_token,
        admin.hashed_refresh_token
      );
      if (!isMatch) {
        throw new UnauthorizedException("Invalid token");
      }
      admin.hashed_refresh_token = "";
      await admin.save();
      res.clearCookie("refresh_token", {
        httpOnly: true,
      });

      return { message: "Logged out successfully" };
    } catch (error) {
      console.error("Signout error:", error);
      throw new UnauthorizedException("Error occurred during logout");
    }
  }

  async refreshAdminToken(req: Request, res: Response) {
    const refresh_token = req.cookies?.refresh_token;

    if (!refresh_token) {
      throw new BadRequestException("Refresh token is required");
    }
    let decoded: any;
    try {
      decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      throw new UnauthorizedException("Invalid or expired refresh token");
    }

    const admin = await this.adminService.findOne(decoded.id);

    if (!admin || !admin.hashed_refresh_token) {
      throw new UnauthorizedException("User not found or token missing");
    }

    const isMatch = await bcrypt.compare(
      refresh_token,
      admin.hashed_refresh_token
    );
    if (!isMatch) {
      throw new UnauthorizedException("Token mismatch");
    }

    const payload = { id: admin.id };
    const newAccessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN!,
    });

    const newRefreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET!,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN!,
      }
    );

    const hashedNewRefresh = await bcrypt.hash(newRefreshToken, 7);
    admin.hashed_refresh_token = hashedNewRefresh;
    await admin.save();

    res.cookie("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: +process.env.COOKIE_TIME!,
    });

    return {
      message: "Admin accessToken refreshed",
      access_token: newAccessToken,
    };
  }
  async generateTokensCustomer(customer: CustomerDocument) {
    const payload = {
      id: customer._id,
      is_active: customer.is_active,
      email: customer.email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.SECRET_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async registerCustomer(createCustomerDto: CreateCustomerDto) {
    const candidate = await this.adminService.findByEmail(
      createCustomerDto.email
    );

    if (candidate) {
      throw new ConflictException("This admin already exists in the system");
    }

    const newCustomer = await this.customerService.create(createCustomerDto);

    try {
      await this.mailService.sendMail(newCustomer);
    } catch (error) {
      throw new ServiceUnavailableException("email da xatolik");
    }
    return {
      message: `Ro'yhatdan o'tdingiz. Akkauntni faollashtirish uchun email ni tasdiqlang}`,
      adminId: newCustomer._id,
    };
  }

  async loginCustomer(loginCustomerDto: LoginCustomerDto, res: Response) {
    const customer = await this.customerService.findByEmail(
      loginCustomerDto.email
    );

    if (!customer) {
      throw new UnauthorizedException(
        "This customer does not exist. Check your email and password"
      );
    }

    const isValid = await bcrypt.compare(
      loginCustomerDto.password,
      customer.hashed_password
    );

    if (!isValid) {
      throw new UnauthorizedException(
        "Email or password is incorrect. Check your email and password"
      );
    }

    const { accessToken, refreshToken } =
      await this.generateTokensCustomer(customer);

    customer.hashed_refresh_token = await bcrypt.hash(refreshToken, 7);

    await customer.save();

    res.cookie("refresh_token", refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });

    return {
      message: "User signed in 🎉",
      customerId: customer._id,
      accessToken,
    };
  }

  async logoutCustomer(req: Request, res: Response) {
    try {
      const refresh_token = req.cookies.refresh_token;
      if (!refresh_token) {
        throw new BadRequestException("Refresh token is required");
      }
      const decoded: any = jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN_KEY!
      );
      const customer = await this.customerService.findOne(decoded.id);

      if (!customer || !customer.hashed_refresh_token) {
        throw new UnauthorizedException("Admin has no refresh token");
      }
      const isMatch = await bcrypt.compare(
        refresh_token,
        customer.hashed_refresh_token
      );
      if (!isMatch) {
        throw new UnauthorizedException("Invalid token");
      }
      customer.hashed_refresh_token = "";
      await customer.save();
      res.clearCookie("refresh_token", {
        httpOnly: true,
      });

      return { message: "Logged out successfully" };
    } catch (error) {
      console.error("Signout error:", error);
      throw new UnauthorizedException("Error occurred during logout");
    }
  }

  async refreshCustomerToken(req: Request, res: Response) {
    const refresh_token = req.cookies?.refresh_token;

    if (!refresh_token) {
      throw new BadRequestException("Refresh token is required");
    }
    let decoded: any;
    try {
      decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      throw new UnauthorizedException("Invalid or expired refresh token");
    }

    const customer = await this.customerService.findOne(decoded.id);

    if (!customer || !customer.hashed_refresh_token) {
      throw new UnauthorizedException("User not found or token missing");
    }

    const isMatch = await bcrypt.compare(
      refresh_token,
      customer.hashed_refresh_token
    );
    if (!isMatch) {
      throw new UnauthorizedException("Token mismatch");
    }

    const payload = { id: customer.id };
    const newAccessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY!, {
      expiresIn: process.env.ACCESS_TOKEN_TIME!,
    });

    const newRefreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_KEY!, {
      expiresIn: process.env.REFRESH_TOKEN_TIME!,
    });

    const hashedNewRefresh = await bcrypt.hash(newRefreshToken, 7);
    customer.hashed_refresh_token = hashedNewRefresh;
    await customer.save();

    res.cookie("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: +process.env.COOKIE_TIME!,
    });

    return {
      message: "Customer accessToken refreshed",
      access_token: newAccessToken,
    };
  }
}
