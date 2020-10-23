import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountInformationPage } from './account-information.page';

const routes: Routes = [
  {
    path: '',
    component: AccountInformationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountInformationPageRoutingModule {}
