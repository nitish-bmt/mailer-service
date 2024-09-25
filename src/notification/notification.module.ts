import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';

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
  controllers: [],
  providers: [NotificationService],
  exports: [NotificationService]
})
export class NotificationModule {}
