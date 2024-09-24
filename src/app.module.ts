import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'
import { HealthcheckController } from './healthcheck/healthcheck.controller';
import { HealthcheckService } from './healthcheck/healthcheck.service';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { Verification } from './verification/entity/verification.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { VerificationController } from './verification/verification.controller';
import { VerificationService } from './verification/verification.service';
import { EmailModule } from './email/email.module';
import { EmailService } from './email/email.service';
import { EmailController } from './email/email.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),  // Ensure the config module is used to load .env variables
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.getOrThrow<string>('POSTGRES_HOST'),
        port: configService.getOrThrow<number>('POSTGRES_PORT'),
        username: configService.getOrThrow<string>('POSTGRES_USERNAME'), 
        password: configService.getOrThrow<string>('POSTGRES_PASSWORD'),
        database: configService.getOrThrow<string>('POSTGRES_DB'),
        entities: [Verification],  
        synchronize: true,  //don't use in production (might llose data)
      }),
      inject: [ConfigService],
    }),  
    EmailModule,
    HealthcheckModule,
    ConfigModule.forRoot({
      isGlobal: true,
    })
  ],
  controllers: [AppController, HealthcheckController, VerificationController, EmailController],
  providers: [AppService, HealthcheckService, VerificationService, EmailService],
})
export class AppModule {}
