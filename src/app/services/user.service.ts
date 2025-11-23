import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { APP_CONSTANTS } from '../constant';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3001/users/create';
  readonly  constants= APP_CONSTANTS;

  constructor(private httpService: HttpService,) {}


   registerUser(user: User) {
    return this.httpService.post(this.constants.API_ENDPOINTS.USERS, user);
  }
}


export interface User {
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  date_of_birth?: string;
  profile_picture?: string;
  status?: string;
}
