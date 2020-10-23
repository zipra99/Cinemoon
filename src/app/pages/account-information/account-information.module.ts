import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountInformationPageRoutingModule } from './account-information-routing.module';

import { AccountInformationPage } from './account-information.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountInformationPageRoutingModule
  ],
  declarations: [AccountInformationPage]
})
export class AccountInformationPageModule {}
