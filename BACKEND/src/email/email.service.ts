import { Injectable } from "@nestjs/common";

const nodemailer = require("nodemailer")
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {

  constructor(private mailerService: MailerService) { }

  async sendActiveMail(email: string, activationLink: string) {
    const url = `${process.env.BACKEND_URL}/users/active/${email}/${activationLink}`;

    await this.mailerService.sendMail({
      to: email,
      from: process.env.SMTP_USER,
      subject: 'Confirm your Email',
      text: "",
      html: `
            <!DOCTYPE html>
            <html>
               <head>
                <style>
                    div{
                        background-color: #212121;
                        color: #fff;
                        font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
                        padding: 20px;
                        padding-top:10px;
                    }
                    h1,h2,p{
                        color: #fff;
                        font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
                    }
                  a{
                    text-decoration: none;
                    color: #fff;
                    padding: 5px 10px;
                    font-size: 28px;
                    border-radius: 10px;
                    border: #fff 1px solid;
                    font-weight: bold;
                  }
                  a:hover{
                    transition: 0.3s;
                    transform: scale(1.1);
                  }
                  a:visited{
                    color: #fff;
                  }
                </style>
               </head>
            <body>
            
              <div>
                <h1>Hey, it's TSWORK</h1>
                <h1>Please click below to confirm your email</h1>
                <a href='${url}'>Confirm</a>
              </div>
            </body>
            </html>
            `
    });
  }
}

