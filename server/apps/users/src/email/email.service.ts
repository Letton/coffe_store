import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

interface IMailOptions {
  subject: string;
  email: string;
  name: string;
  activationCode: string;
  template: string;
}
@Injectable()
export class EmailService {
  constructor(private mailService: MailerService) {}

  async sendMail(mailOptions: IMailOptions) {
    await this.mailService.sendMail({
      to: mailOptions.email,
      subject: mailOptions.subject,
      template: mailOptions.template,
      context: {
        name: mailOptions.name,
        activationCode: mailOptions.activationCode,
      },
    });
  }
}
