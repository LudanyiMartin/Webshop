import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { NewOrderDto } from './newOrder.dto';
import { Response, response } from 'express';
import { error } from 'console';

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
    return{
      errors: [],
      data: []
    }
  }


  @Post('termekek')
  newPurchase(
    @Body() orderData: NewOrderDto,
    @Res() response: Response
  ) {
    const errors: string [] = [];
    if(!orderData.nev || !orderData.szaml_Orszag || !orderData.szaml_IranySzam || !orderData.szaml_Varos || !orderData.szaml_UtcaHsz || !orderData.szall_Orszag || !orderData.szall_IranySzam || !orderData.szall_Varos || !orderData.szall_UtcaHsz || !orderData.kartyaSzam || !orderData.lej_datum || !orderData.cvv || !orderData.kuponkod){
      errors.push("Minden mezőt meg kell adni!👧🏿")
    }
    if(!/^\d{4}-\d{4}-\d{4}-\d{4}$/.test(orderData.kartyaSzam) || !/^[A-Z]{2}-\d{4}$/.test(orderData.kuponkod)){
      errors.push("A kártyaszám vagy a kuponkód helytelenül van megadva!👼🏿")
    }
    if(isNaN(orderData.szall_IranySzam) || isNaN(orderData.szaml_IranySzam) || isNaN(orderData.cvv)){
      errors.push("Az irányítószámoknak illetve a CVV kódnak számnak kell lennie!👷🏿‍♀️")
    }
    if(orderData.szall_IranySzam.toString().length < 4 || orderData.szall_IranySzam.toString().length > 4){
      errors.push("A szállítási irányítószám helytelenül van megadva!👩🏿‍⚖️")
    }
    if( orderData.szaml_IranySzam.toString().length < 4 || orderData.szaml_IranySzam.toString().length > 4){
      errors.push("A számla irányítószám helytelenül van megadva!👨🏿‍🎓")
    }
    if(orderData.cvv.toString().length < 3 || orderData.cvv.toString().length > 3){
      errors.push("A CVV kód helytelenül van megadva!👨🏿‍🍳")
    }
    if(errors.length > 0){
      response.render('termekek', {
        errors,
        data: orderData
      })
    }
    response.redirect(303, 'success')
  }

  @Get('success')
  @Render('success')
  successPage(){
    
  }
}
