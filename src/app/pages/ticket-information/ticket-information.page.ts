import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TicketInfoService } from 'src/app/services/ticket-info.service';

@Component({
  selector: 'app-ticket-information',
  templateUrl: './ticket-information.page.html',
  styleUrls: ['./ticket-information.page.scss'],
})
export class TicketInformationPage implements OnInit {
  movieDetail: string[] = [];
  totalMoneyString: string;
  userInfo: any = {};
  urlQRCode: string;
  bookingSeat: any = {};
  listBookingFood: any[] = [];

  constructor(
    private navCtrl: NavController,
    public ticketInfo: TicketInfoService
  ) {
    this.totalMoneyString = ticketInfo.getTotalMoneyString();
    this.userInfo = ticketInfo.userInfo;
    this.urlQRCode = ticketInfo.urlQRCode;
    this.bookingSeat = ticketInfo.getBookingSeatInfo();
    this.listBookingFood = ticketInfo.bookingFoodList;
  }

  ngOnInit() {
    this.movieDetail = this.ticketInfo.getStringMovieInfo();
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
    this.navCtrl.navigateBack('home');
  }
}
