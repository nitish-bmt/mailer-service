import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SentMessageInfo } from 'nodemailer';

@Injectable()
export class NotificationService {

  constructor(private readonly mailService: MailerService){}
  
  async sendEmail(email: string, token: string): Promise<SentMessageInfo>{
    return await this.mailService.sendMail({
      from: 'VERIFIER',
      to: email,
      subject: 'VERIFICATION',
      text: `click here for verification: localhost:${process.env.PORT}/verify/${token}`
    })
  }
}
