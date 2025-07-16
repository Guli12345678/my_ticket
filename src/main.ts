import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { BadRequestException, ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";
async function start() {
  try {
    const PORT = process.env.PORT ?? 3030;
    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
      .setTitle("My Ticket Project")
      .setDescription("This project involves NestJS RESTFULL API")
      .setVersion("1.0")
      .addTag("AccessToken, RefreshToken, Cookie, BOT, SMM, SendMail, Guards")
      .addBearerAuth()
      .addServer("/api")
      .build();

    app.enableCors({
      origin: (origin, callback) => {
        const allowedOrigins = [
          "http://localhost:8000",
          "http://localhost:3000",
          "https://my_ticket.uz",
          "https://api.my_ticket.uz",
          "https://my_ticket.vercel.app",
        ];
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new BadRequestException("Not allowed by CORS"));
        }
      },
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true, //cookie and header, if axios in frontend add "withcredientials: true"
    });

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("/api/docs", app, document);
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix("api");
    await app.listen(PORT, () => {
      console.log(
        " + ====================================================================== +"
      );
      console.log(
        `| |                                                                      | |`
      );
      console.log(
        `| | 🩷             Server started at: http://localhost:${PORT}           🩷   | |`
      );
      console.log(
        `| |                                                                      | |`
      );
      console.log(
        " + ====================================================================== +"
      );
    });
  } catch (error) {
    console.log("Error:", error);
  }
}

start();
