import { Module } from "@nestjs/common";
import { VerificationService } from "./verification.service";
import { VerificationController } from "./verification.controller";
import { NotificationService } from "../notification/notification.service";
import { NotificationModule } from "../notification/notification.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Verification } from "./entity/verification.entity";
import { VerificationRepository } from "./repository/verification.repository";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forFeature([Verification]), 
    NotificationModule
  ],
  controllers: [VerificationController],
  providers: [VerificationService, VerificationRepository, NotificationService],
  exports: [],
})
export class VerificationModule{}