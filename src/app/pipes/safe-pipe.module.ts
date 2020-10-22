import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SafePipe } from './safe-pipe.pipe';

@NgModule({
  declarations: [SafePipe],
  imports: [IonicModule],
  exports: [SafePipe]
})
export class SafePipeModule { }