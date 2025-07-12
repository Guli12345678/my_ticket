import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { Customer } from "../customers/entities/customer.entity";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(customer: Customer) {
    const url = `${process.env.api_url}/api/auth/user/activate/${customer.activation_link}`;
    const obj = {
      username: customer.first_name,
      url,
    };
    await this.mailerService.sendMail({
      to: customer.email,
      subject: "welcome to My Ticket",
      html: `<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to My Ticket</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        color: #333;
        padding: 20px;
      }

      .container {
        max-width: 600px;
        margin: auto;
        background-color: #fff;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }

      h1 {
        color: #007bff;
      }

      a.button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        margin-top: 20px;
      }

      p {
        line-height: 1.6;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Welcome, ${obj.username}! 🎉</h1>
      <p>
        Thank you for joining
        <strong>My Ticket App</strong>. Please click the button below to confirm
        your account:
      </p>
      <a href="${obj.url}" class="button">Confirm</a>
      <p>If you didn’t request this email, just ignore it.</p>
      <hr />
      <small>This email was sent by My Restaurant App.</small>
    </div>
  </body>
</html>`,
      context: {
        username: customer.first_name,
        url,
      },
    });
  }
}
