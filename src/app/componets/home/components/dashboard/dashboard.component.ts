import { Component } from '@angular/core';
import { Customer, CustomerListComponent } from '../customer-list/customer-list.component';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CustomerListComponent,CustomerDetailsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  selectedCustomer?: Customer;

  onCustomerSelected(customer: Customer) {
    this.selectedCustomer = customer;
  }
}
