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
import { VerificationModule } from './verification/verification.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
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
    NotificationModule,
    HealthcheckModule,
    VerificationModule,
    ConfigModule.forRoot({
      isGlobal: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
