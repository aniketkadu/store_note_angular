import { Component, Input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { Customer } from '../customer-list/customer-list.component';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from '../../../../shared/shared-material/shared-material.module';
import { CustomerService } from '../../../../services/customer.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [CommonModule, SharedMaterialModule, FormsModule, ReactiveFormsModule, RouterLink],
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
if(!changes['customer'].firstChange) {
  this.getPurchases();

}
  }

  dataSource:any[] = [
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

  getStringiFy(data:any) {
    return JSON.stringify(data)
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
