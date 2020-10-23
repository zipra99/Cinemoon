import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TicketInfoService } from 'src/app/services/ticket-info.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage implements OnInit {
  method:Array<string> = ['Visa & Mastercard','Nội địa','MoMo','Trực tiếp'];
  colorName: string;
  constructor(
    private navCtrl: NavController,
    public ticketInfo: TicketInfoService
  ) { }
  
  switchMethod(index: number){
    for(let i = 0; i < 4; i++){
      (document.getElementById(`method-${i}`) as HTMLScriptElement).style.backgroundColor = this.colorName;
    }
    (document.getElementById(`method-${index}`) as HTMLScriptElement).style.backgroundColor = 'rgb(230 34 64 / 82%)';
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.colorName = (document.getElementById('method-0') as HTMLScriptElement).style.backgroundColor;
    (document.getElementById('method-0') as HTMLScriptElement).style.backgroundColor = 'rgb(230 34 64 / 82%)';
  }

  navigate(page){
    switch(page){
      case 'movie':
        this.navCtrl.navigateBack('movie-list');
        break;
      case 'home':
        this.navCtrl.navigateBack('home');
        break;
      case 'account':
        this.navCtrl.navigateForward('account-information');
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
