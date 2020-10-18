import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoodChoicePageRoutingModule } from './food-choice-routing.module';

import { FoodChoicePage } from './food-choice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoodChoicePageRoutingModule
  ],
  declarations: [FoodChoicePage]
})
export class FoodChoicePageModule {}
