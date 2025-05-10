import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const materialModules:Array<Type<unknown>> = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    materialModules
  ],
  exports:[materialModules]
})
export class SharedMaterialModule { }
