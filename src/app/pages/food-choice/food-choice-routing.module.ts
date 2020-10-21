import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodChoicePage } from './food-choice.page';

const routes: Routes = [
  {
    path: '',
    component: FoodChoicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodChoicePageRoutingModule {}
