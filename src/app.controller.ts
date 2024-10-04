import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { NewOrderDto } from './newOrder.dto';
import { response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  @Get('termekek')
  @Render('termekek')
  getTermek(){

  }

  @Post('termekek')
  @Render('success')
  newPurchase(
    @Body() orderData: NewOrderDto,
    @Res() response: Response
  ) {
    const errors: string [] = [];
    if(!orderData.nev || !orderData.szaml_Orszag || !orderData.szaml_IranySzam || !orderData.szaml_Varos || !orderData.szaml_UtcaHsz || !orderData.szall_Orszag || !orderData.szall_IranySzam || !orderData.szall_Varos || !orderData.szall_UtcaHsz || !orderData.kartyaSzam || !orderData.lej_datum || !orderData.cvv || !orderData.kuponkod){
      errors.push("Minden mezőt meg kell adni!👧🏿")
    }
    if(!/^\d{4}-\d{4}-\d{4}-\d{4}$/.test(orderData.kartyaSzam) || /^[A-Z]{2}-\d{4}$/.test(orderData.kuponkod)){
      errors.push("A kártyaszám vagy a kuponkód helytelenül van megadva!👼🏿")
    }
    if(isNaN(orderData.szall_IranySzam) || isNaN(orderData.szaml_IranySzam) || isNaN(orderData.cvv)){

    }
  }
}
