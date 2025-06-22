import { effect, Injectable, signal } from '@angular/core';
import { HttpService } from './http.service';
import { APP_CONSTANTS } from '../constant';
import { Router } from '@angular/router';
const LOGIN_KEY = 'isLoggedIn';
const USER_KEY = 'userName';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  readonly constants = APP_CONSTANTS;
  private isLoggedInSignal = signal<boolean>(localStorage.getItem(LOGIN_KEY) === 'true');
  private userNameSignal = signal<string | null>(localStorage.getItem(USER_KEY) || null);

  readonly isLoggedIn = this.isLoggedInSignal.asReadonly();
  readonly userName = this.userNameSignal.asReadonly();

  constructor(private httpService: HttpService,private router:Router) {
     // Persist changes to localStorage
     effect(() => {
      localStorage.setItem(LOGIN_KEY, this.isLoggedInSignal().toString());
    });

    effect(() => {
      const value = this.userNameSignal();
      if (value) {
        localStorage.setItem(USER_KEY, value);
      } else {
        localStorage.removeItem(USER_KEY);
      }
    });
  }
  
  login(payload: any) {
    return this.httpService.post(this.constants.API_ENDPOINTS.LOGIN, payload);
  }
  setloginStatus(userName: string) {
    this.isLoggedInSignal.set(true);
    localStorage.setItem('is_loggedin','true');
    this.userNameSignal.set(userName);
  }

  logout() {
    this.isLoggedInSignal.set(false);
    localStorage.setItem('is_loggedin','false');
    this.userNameSignal.set(null);
    localStorage.removeItem(LOGIN_KEY);
    localStorage.removeItem(USER_KEY);
    this.router.navigate(['/login'])

  }
}
