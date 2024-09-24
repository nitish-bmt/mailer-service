import {Body, Controller, Get, Inject, Param, Post} from "@nestjs/common";
import { VerificationService } from "./verification.service";
import { RequestPayload } from "../utils/types";

@Controller('verify')
export class VerificationController{

  
  constructor(
    private readonly verificationService: VerificationService
  ){}

  @Post('email')
  async sendVerificationEmail(@Body() body: RequestPayload){
    this.verificationService.sendVerificationEmail(body);
  }

  @Post(':token')
  async verifyEmail(@Param() token: string){
    return this.verificationService.verifyEmail(token);
  }

}