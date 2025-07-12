import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { AdminModule } from "../admin/admin.module";
import { CustomersModule } from "../customers/customers.module";
import { MailModule } from "../mail/mail.module";

@Module({
  imports: [JwtModule.register({}), AdminModule, CustomersModule, MailModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
