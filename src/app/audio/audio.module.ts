import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AudioRoutingModule } from './audio-routing.module';
import { AudioComponent } from './audio.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    AudioComponent
  ],
  imports: [
    CommonModule,
    AudioRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
  ]
})
export class AudioModule { }
