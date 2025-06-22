import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private defaultConfig: Partial<IndividualConfig> = {
    timeOut: 3000,
    closeButton: true,
    positionClass: 'toast-top-right'
  };

  constructor(private toastr: ToastrService) {}

  success(message: string, title: string = 'Success') {
    this.toastr.success(message, title, this.defaultConfig);
  }

  error(message: string, title: string = 'Error') {
    this.toastr.error(message, title, this.defaultConfig);
  }

  info(message: string, title: string = 'Info') {
    this.toastr.info(message, title, this.defaultConfig);
  }

  warning(message: string, title: string = 'Warning') {
    this.toastr.warning(message, title, this.defaultConfig);
  }
}
