import {Controller, Get} from '@nestjs/common';
import { HealthcheckService } from "./healthcheck.service";

@Controller('healthcheck')
export class HealthcheckController{
  constructor(
    private readonly healthcheckService: HealthcheckService,
  ){}

  @Get()
  getHealthStatus(){
    return this.healthcheckService.getHealthStatus();
  }
}