import { Component, Input } from '@angular/core';
import { Customer } from '../customer-list/customer-list.component';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from '../../../../shared/shared-material/shared-material.module';

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [CommonModule,SharedMaterialModule ],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.scss'
})
export class CustomerDetailsComponent {
  @Input() customer?: Customer;


  dataSource = [
    {
      item_name: 'Wireless Mouse',
      quantity: 2,
      price: '25.99',
      purchase_date: '2025-04-19T17:41:04.000Z',
      payment_status: 'pending'
    },
    {
      item_name: 'USB Keyboard',
      quantity: 1,
      price: '45.00',
      purchase_date: '2025-06-20T10:00:00.000Z',
      payment_status: 'paid'
    }
  ];

  edit(item: any) {
    console.log('Edit clicked:', item);
  }

  delete(item: any) {
    console.log('Delete clicked:', item);
  }
}
