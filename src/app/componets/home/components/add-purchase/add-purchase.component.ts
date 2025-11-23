import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CustomerService } from '../../../../services/customer.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-purchase',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './add-purchase.component.html',
  styleUrl: './add-purchase.component.scss'
})
export class AddPurchaseComponent {
  purchaseForm!: FormGroup;
  loading = false;
  customerData:any;
 

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private custService:CustomerService,
    private toastService:ToastrService,
  ) {
   this.customerData = this.route.snapshot.queryParamMap.get('customerData');
   this.customerData = this.customerData ?  JSON.parse(this.customerData) : {}
  }

  ngOnInit(): void {
    this.purchaseForm = this.fb.group({
      customer_id: [this.customerData?.customer_id],
      items: this.fb.array([this.createItem()])
    });
  }

  // FormArray getter
  get items(): FormArray {
    return this.purchaseForm.get('items') as FormArray;
  }

  // Create a single item row
  createItem(): FormGroup {
    return this.fb.group({
      item_name: ['', [Validators.required, Validators.minLength(2)]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      quantity: ['', [Validators.required, Validators.min(1)]]
    });
  }

  // Add item row
  addItem(): void {
    this.items.push(this.createItem());
  }

  // Remove item row
  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  // Submit form
  onSubmit(): void {
    if (this.purchaseForm.invalid) {
      this.purchaseForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.custService.createPurchase( this.purchaseForm.value).subscribe({
      next: (res: any) => {
        this.loading = false;
          this.toastService.success(res.message);
        this.purchaseForm.reset();
        this.items.clear();
        this.addItem(); // add one blank item row back
      },
      error: (err) => {
        this.loading = false;
        const message = err?.error?.message || 'Failed to save purchase ❌';
         this.toastService.error(message);
      }
    });
  }
}
