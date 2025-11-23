import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedMaterialModule } from '../../shared/shared-material/shared-material.module';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { NotificationService } from '../../services/notification.service';
import { HeaderComponent } from '../header/header.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, SharedMaterialModule, CommonModule, HeaderComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements AfterViewInit{
  @ViewChild('usernameField',{static:true}) usernameField!:ElementRef
  constructor(private fb: FormBuilder, private loginService: LoginService, private toastService: NotificationService,private router:Router) {
    if(this.loginService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }
  ngAfterViewInit(): void {
    this.usernameField.nativeElement.focus();
  }

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', Validators.required],
  });

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login data:', this.loginForm.value);
      this.loginService.login(this.loginForm.value).subscribe({
        next: () => {
          this.toastService.success('Welcome!','Hi');
          this.loginService.setloginStatus('User');
          this.router.navigate(['/home'])
        },
        error: (err) => {
          this.toastService.error(err.message);
        },
      });
      // call API or auth service here
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
