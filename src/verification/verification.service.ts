import {Injectable, InternalServerErrorException, UnauthorizedException} from "@nestjs/common"
import { RequestPayload } from "../utils/types";
import { TokenGenerationDto } from "./dto/verification.dto";
import { VerificationRepository } from "./repository/verification.repository";
import { Verification } from "./entity/verification.entity";
import { MailerService } from "@nestjs-modules/mailer";
import { VerificationErrorMessages } from "../utils/constants/errors.constant";
import { EmailService } from "../email/email.service";

@Injectable()
export class VerificationService{

  constructor(
    private readonly verificationRepository: VerificationRepository,
    private readonly emailService: EmailService
  ){}

  async sendVerificationEmail(body: RequestPayload){

    let newUserVerification: TokenGenerationDto;
    newUserVerification.userId = body.userId;
    newUserVerification.email = body.email;

    let verification: Verification;
    try{
      verification = await this.verificationRepository.generateVerificationToken(newUserVerification);
    }
    catch(error){
      throw error;
    }
    try{
      await this.emailService.sendEmail(body.email, verification.token);
    }
    catch(error){
      throw error;
    }

  }

  async verifyEmail(token: string): Promise<string>{
    let userId: string;
    try{
      userId = await this.verificationRepository.verifyToken(token);
    }
    catch(error){
      if (error instanceof UnauthorizedException)
        throw error;

      throw new InternalServerErrorException(VerificationErrorMessages.ERROR)
    }

    return userId;
  }
}