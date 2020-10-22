import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TicketInfoService } from 'src/app/services/ticket-info.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    public ticketInfo: TicketInfoService
  ) { }

  ngOnInit() {
  }

  navigate(page){
    switch(page){
      case 'movie':
        this.navCtrl.navigateBack('movie-list');
        break;
      case 'home':
        this.navCtrl.navigateBack('home');
        break;
      default:
        break;
    }
  }

  btnNext(){
    this.ticketInfo.updateListSoldSeat();
    this.navCtrl.navigateForward('ticket-information');
  }
}
