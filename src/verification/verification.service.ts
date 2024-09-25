import {Injectable, InternalServerErrorException, UnauthorizedException} from "@nestjs/common"
import { RequestPayload } from "../utils/types";
import { TokenGenerationDto } from "./dto/verification.dto";
import { VerificationRepository } from "./repository/verification.repository";
import { Verification } from "./entity/verification.entity";
import { MailerService } from "@nestjs-modules/mailer";
import { VerificationErrorMessages } from "../utils/constants/errors.constant";
import { NotificationService } from "../notification/notification.service";

@Injectable()
export class VerificationService{

  constructor(
    private readonly verificationRepository: VerificationRepository,
    private readonly notificationService: NotificationService
  ){}

  async sendVerificationEmail(tokenGenerationDetails: RequestPayload){

    let verification: Verification;
    try{
      verification = await this.verificationRepository.generateVerificationToken(tokenGenerationDetails);
    }
    catch(error){
      throw error;
    }
    try{
      await this.notificationService.sendEmail(tokenGenerationDetails.email, verification.token);
    }
    catch(error){
      throw error;
    }

  }

  async verifyEmail(token: string): Promise<string>{

    try{
      return await this.verificationRepository.verifyToken(token);
    }
    catch(error){
      if (error instanceof UnauthorizedException)
        throw error;

      throw new InternalServerErrorException(VerificationErrorMessages.ERROR)
    }

  }
}