import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ProtfolioComponent } from './protfolio/protfolio.component';
import { ProtofolioRoutingModule } from './protofolio-routing.module';



@NgModule({
  declarations: [
    ProtfolioComponent
  ],
  imports: [
    CommonModule,
    ProtofolioRoutingModule,
    NgxChartsModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ProtofolioModule { }
