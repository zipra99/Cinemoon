import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketInformationPage } from './ticket-information.page';

const routes: Routes = [
  {
    path: '',
    component: TicketInformationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketInformationPageRoutingModule {}
