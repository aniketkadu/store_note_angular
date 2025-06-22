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
}
