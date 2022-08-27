import { Injectable } from "@nestjs/common";


@Injectable()
export class EmailService {

    sendActiveMail(email: string, activationLink:string): string {
        return "sddf"
    }
}