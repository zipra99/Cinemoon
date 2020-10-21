import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeatChoicePage } from './seat-choice.page';

const routes: Routes = [
  {
    path: '',
    component: SeatChoicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeatChoicePageRoutingModule {}
