import { Module } from "@nestjs/common";
import { VerificationService } from "./verification.service";
import { VerificationController } from "./verification.controller";
import { MailerService } from "@nestjs-modules/mailer";
import { EmailService } from "../email/email.service";

@Module({
  imports: [MailerService],
  controllers: [VerificationController],
  providers: [VerificationService, EmailService],
  exports: [],
})
export class verificationModule{}