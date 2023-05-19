/*
 * Copyright (C) Vladimir Vysokomornyi
 * All Rights Reserved.
 */

import { Body, Controller, Get } from '@nestjs/common';
import { MailService } from '../../services/mailer/mail.service';
import { Mail } from './dto/mail';
import { User } from '../../services/mailer/user';

@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) {}

  @Get('send')
  sendMail(@Body() dto: Mail): any {
    return this.mailService.send(dto);
  }

  @Get('send2')
  async sendMail2(@Body() user: User): Promise<any> {
    const token = Math.floor(1000 + Math.random() * 9000).toString();

    return await this.mailService.sendUserConfirmation(user, token);
  }

  @Get('send-via-google')
  sendViaGoolge(): void {
    return this.mailService.sendMail();
  }
}
