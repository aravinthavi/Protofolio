import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestmentFormComponent } from './investment-form.component';
import { InvestmentFormRoutingModule } from './investment-form-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
@NgModule({
  declarations: [
    InvestmentFormComponent
  ],
  imports: [
    CommonModule,
    InvestmentFormRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule 
  ]
})
export class InvestmentFormModule { }
