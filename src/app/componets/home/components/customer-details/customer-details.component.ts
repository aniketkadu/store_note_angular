import { Component, Input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { Customer } from '../customer-list/customer-list.component';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from '../../../../shared/shared-material/shared-material.module';
import { CustomerService } from '../../../../services/customer.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [CommonModule,SharedMaterialModule,FormsModule,ReactiveFormsModule ],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.scss'
})
export class CustomerDetailsComponent implements OnInit,OnChanges{
  paymentStatus = {
    pending:'pending',
    completed:'completed',
    all:'all'
  }
  toggleControl = new FormControl(this.paymentStatus.pending);
  @Input() customer?: Customer;
  constructor(private custService:CustomerService) {

  }
  ngOnChanges(changes: SimpleChanges): void {
   this.getPurchases();
  }

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

  filterChange(event:any) {
      console.log(event);
  }

   ngOnInit() {
   this.toggleControl.valueChanges.subscribe(res=> {
    this.getPurchases();
   })
  }

  getPurchases() {
     const payload:any  = {
      customer_id:this.customer?.customer_id,
      payment_status:this.toggleControl.value
    }
    this.custService.getPurchaseByCustomer(payload).subscribe((res:any) => {
     this.dataSource = res.data.purchases || []
       console.log('res',res.data);
    })
  }
}
