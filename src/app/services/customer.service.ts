import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { APP_CONSTANTS } from '../constant';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
readonly constants = APP_CONSTANTS;
  constructor(private httpService: HttpService) { }


  getCustomers(){
   return this.httpService.get(this.constants.API_ENDPOINTS.CUSTOMERS);
  }
  createCustomer(data:any){
   return this.httpService.post(this.constants.API_ENDPOINTS.CUSTOMERS,data);
  }
  getPurchaseByCustomer(data:{customer_id:number, payment_status:string}){
   return this.httpService.post(this.constants.API_ENDPOINTS.PURCHASE,data);
  }
  createPurchase(data:any){
   return this.httpService.post(this.constants.API_ENDPOINTS.CREATEPURCHASES,data);
  }
}
