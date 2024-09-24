import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService)=>({
        transport: {
          host: configService.getOrThrow<string>('EMAIL_HOST'),
          port: configService.getOrThrow<number>('EMAIL_PORT'),
          secure: true,
          auth: {
            user: configService.getOrThrow<string>('EMAIL_USERNAME'),
            pass: configService.getOrThrow<string>('EMAIL_PASSWORD')
          },
        },
      }),
      inject: [ConfigService],
    }),   
  ],
  controllers: [EmailController],
  providers: [EmailService, MailerService],
})
export class EmailModule {}
