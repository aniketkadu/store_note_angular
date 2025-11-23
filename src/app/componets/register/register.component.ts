import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  registerForm!: FormGroup;
  loading = false;
  message = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      first_name: [''],
      last_name: [''],
      date_of_birth: [''],
      profile_picture: [''],
      status: ['active']
    });
  }

  submitForm() {
    if (this.registerForm.invalid) {
      this.message = "Please fill all required fields.";
      return;
    }

    this.loading = true;

    this.userService.registerUser(this.registerForm.value)
      .subscribe({
        next: (res:any) => {
          this.loading = false;
          this.message = res.message || "User created!";
          this.registerForm.reset();
        },
        error: (err:any) => {
          this.loading = false;
          this.message = err.error?.message || "Something went wrong!";
        }
      });
  }
}
