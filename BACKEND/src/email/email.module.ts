import { Module } from "@nestjs/common";
import { EmailService } from "./email.service";
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          service: 'XXXXXXXXXXXXXXXXXXXXx',
          host: "XXXXXXXXXXXXXXXXXXXXx",
          port: 999,
          secure: false,
          auth: {
            user: "XXXXXXXXXXXXXXXXXXXXx",
            pass: "XXXXXXXXXXXXXXXXXXXXx"
          },
          tls: {
            rejectUnauthorized: false
          }
        },
        defaults: {
          from: `No Reply`,
        },
        template: {
          dir: join(__dirname, './templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),

    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule { }
