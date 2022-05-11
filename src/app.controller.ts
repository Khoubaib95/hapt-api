import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { getHello } from './@types';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): getHello {
    return this.appService.getHello();
  }
}
