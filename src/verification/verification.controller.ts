import {Body, Controller, Get, Inject, Param, Post} from "@nestjs/common";
import { VerificationService } from "./verification.service";
import { RequestPayload, TokenParamPayload } from "../utils/types";
import { TokenGenerationDto } from "./dto/verification.dto";

@Controller('verify')
export class VerificationController{

  
  constructor(
    private readonly verificationService: VerificationService
  ){}

  @Post('email')
  async sendVerificationEmail(@Body() body: RequestPayload){
    try{
      return await this.verificationService.sendVerificationEmail({userId: body.userId, email: body.email} as TokenGenerationDto);
    }
    catch(error){
      throw error;
    }
  }

  @Get('/:token')
  async verifyEmail(@Param() params: TokenParamPayload){
    console.log(params.token, "Controller token")
    return await this.verificationService.verifyEmail(params.token);
  }

}