import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../../../../services/customer.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from '../../../../shared/shared-material/shared-material.module';
@Component({
  selector: 'app-customer-dialog',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    SharedMaterialModule,
    CommonModule
  ],

  templateUrl: './customer-dialog.component.html',
  styleUrl: './customer-dialog.component.scss'
})
export class CustomerDialogComponent {
constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private toastService: ToastrService,
    public dialogRef: MatDialogRef<CustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  customerForm = this.fb.group({
    cust_name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    status: ['active']
  });

  loading = false;

  submit() {
    if (this.customerForm.invalid) return;

    this.loading = true;

    this.customerService.createCustomer(this.customerForm.value)
      .subscribe({
        next: (res:any) => {
          this.loading = false;
           this.toastService.success(res.message);
          this.dialogRef.close(true);
        },
        error: () => {
          this.toastService.error('Something went wrong.');
          this.loading = false;
        }
      });
  }

  close() {
    this.dialogRef.close();
  }
}
