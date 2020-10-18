import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeatChoicePageRoutingModule } from './seat-choice-routing.module';

import { SeatChoicePage } from './seat-choice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeatChoicePageRoutingModule
  ],
  declarations: [SeatChoicePage]
})
export class SeatChoicePageModule {}
