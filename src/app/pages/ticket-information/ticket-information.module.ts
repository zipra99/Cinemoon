import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketInformationPageRoutingModule } from './ticket-information-routing.module';

import { TicketInformationPage } from './ticket-information.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketInformationPageRoutingModule
  ],
  declarations: [TicketInformationPage]
})
export class TicketInformationPageModule {}
