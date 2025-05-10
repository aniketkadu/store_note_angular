import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { APP_CONSTANTS } from '../constant';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
readonly constants =  APP_CONSTANTS
  constructor(private httpService:HttpService) {}

    login(payload:any) {
     return this.httpService.post(this.constants.API_ENDPOINTS.LOGIN,payload)
    }
}
