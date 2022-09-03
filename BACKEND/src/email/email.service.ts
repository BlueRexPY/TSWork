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
            subject: 'TSWORK, Confirm your Email',
            text: "",
            html: `
                <p>Hey its TSWORK,</p>
                <p>Please click below to confirm your email</p>
                <p>
                    <a href='${url}'>Confirm</a>
                </p>
            `
        });
        console.log("send")
    }
}

