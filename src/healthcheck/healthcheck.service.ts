import {Injectable} from "@nestjs/common";
import { serverStatus } from "../utils/constants/messages.constants";

@Injectable()
export class HealthcheckService{
  getHealthStatus(){
    return({
      status: 200,
      message: serverStatus.RUNNING,
      serverUptime: this.getServerUptime()
    });
  }

  getServerUptime(){
    return `${Math.floor(process.uptime()/3600)}hrs ${Math.floor((process.uptime()%3600)/60)}mins ${Math.floor(process.uptime()%60)}secs`;
  }
}