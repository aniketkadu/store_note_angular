import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

const materialModules:Array<Type<unknown>> = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatIconModule,
  MatCardModule,
  MatButtonToggleModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
  
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
