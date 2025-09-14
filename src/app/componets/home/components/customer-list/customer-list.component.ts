import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { CustomerService } from '../../../../services/customer.service';

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
  imports: [CommonModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent {

  @Output() customerSelected = new EventEmitter<Customer>();

  customers: Customer[] = [
  ];

  constructor(private custService:CustomerService){

  }

  selectCustomer(customer: Customer) {
    this.customerSelected.emit(customer);
  }

  ngOnInit() {
    this.custService.getCustomers().subscribe((res:any) => {
      this.customers = res.data || []
      console.log('res',res.data);
    })
  }

}


export const resp = {
  "status": "success",
  "message": "User details fetched successfully.",
  "data": [
      {
          "customer_id": 1,
          "name": "Akhil Nayak",
          "email": "akhil@example.com",
          "phone": "9876676767",
          "total_pending_amount": "141.93"
      }
  ]
}