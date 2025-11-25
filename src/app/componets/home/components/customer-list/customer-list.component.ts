import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { CustomerService } from '../../../../services/customer.service';
import { CustomerDialogComponent } from '../customer-dialog/customer-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SharedMaterialModule } from '../../../../shared/shared-material/shared-material.module';

export interface Customer {
  customer_id: number;
  name: string;
  total_pending_amount: number;
  email: string;
  phone: string;
  payments: string[];
}

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule,MatDialogModule,SharedMaterialModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent {

  @Output() customerSelected = new EventEmitter<Customer>();

  customers: Customer[] = [
  ];

  constructor(private custService:CustomerService, private dialog:MatDialog){

  }

  selectCustomer(customer: Customer) {
    this.customerSelected.emit(customer);
  }

  ngOnInit() {
   this.getCustomer();
  }

  getCustomer() {
     this.custService.getCustomers().subscribe((res:any) => {
      this.customers = res.data || []
      console.log('res',res.data);
    })
  }

  openAddCustomerDialog() {
  const dialogRef = this.dialog.open(CustomerDialogComponent, {
    width: '450px'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.getCustomer();

    }
  });

}
}


