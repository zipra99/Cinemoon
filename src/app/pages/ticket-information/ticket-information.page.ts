import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-ticket-information',
  templateUrl: './ticket-information.page.html',
  styleUrls: ['./ticket-information.page.scss'],
})
export class TicketInformationPage implements OnInit {

  constructor(
    private navCtrl: NavController
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
    this.navCtrl.navigateBack('home');
  }
}
