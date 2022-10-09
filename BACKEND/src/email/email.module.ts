import { Module } from "@nestjs/common";
import { EmailService } from "./email.service";
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          service: 'gmail',
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASS
          },
          tls: {
            rejectUnauthorized: false
          }
        },
        defaults: {
          from: `TSWork - No Reply`,
        }
      }),

    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule { }
