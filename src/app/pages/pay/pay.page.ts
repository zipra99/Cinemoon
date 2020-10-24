import { AuthenticationService } from './../../services/shared/authentication.service';
import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { TicketInfoService } from 'src/app/services/ticket-info.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage implements OnInit {
  totalMoneyString: string;
  listBookingSeatString: string;
  bookingSeat: any = {};
  listBookingFood: any[] = [];
  method: Array<string> = ['Visa & Mastercard', 'Nội địa', 'MoMo', 'Trực tiếp'];
  colorName: string;
  movieDetail: string[];
  userInfo: any = {};

  constructor(
    private navCtrl: NavController,
    public toastController: ToastController,
    public authService: AuthenticationService,
    public ticketInfo: TicketInfoService) {
    this.totalMoneyString = ticketInfo.getTotalMoneyString();
    this.listBookingSeatString = ticketInfo.getBookingSeatString();
    this.listBookingFood = ticketInfo.bookingFoodList;
    this.bookingSeat = ticketInfo.getBookingSeatInfo();
    this.checkCurrentUserInfo();
  }

  switchMethod(index: number) {
    for (let i = 0; i < 4; i++) {
      (document.getElementById(`method-${i}`) as HTMLScriptElement).style.backgroundColor = this.colorName;
    }
    (document.getElementById(`method-${index}`) as HTMLScriptElement).style.backgroundColor = 'rgb(230 34 64 / 82%)';
  }

  ngOnInit() {
    this.movieDetail = this.ticketInfo.getStringMovieInfo();
  }

  ngAfterViewInit() {
    this.colorName = (document.getElementById('method-0') as HTMLScriptElement).style.backgroundColor;
    (document.getElementById('method-0') as HTMLScriptElement).style.backgroundColor = 'rgb(230 34 64 / 82%)';
  }

  navigate(page) {
    switch (page) {
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

  checkCurrentUserInfo() {
    this.userInfo = {
      userFullName: '',
      userEmail: '',
    }
    let userDoc = this.authService.getCurrentUserInfo();
    if(userDoc) {
      userDoc.subscribe(data => {
        this.userInfo = {
          userFullName: data.displayName,
          userEmail: data.email
        }
      })
    }
  }

  async btnNext() {
    if(this.userInfo.userFullName && this.userInfo.userEmail) {
      this.ticketInfo.userInfo = this.userInfo;
      this.ticketInfo.updateListSoldSeat();
      this.ticketInfo.urlQRCode = this.ticketInfo.randomQRCodeUrl(16);
      this.navCtrl.navigateForward('ticket-information');
    } else {
      const toast = await this.toastController.create({
        message: 'Nhập đầy đủ thông tin để mua vé',
        duration: 1000,
        position: 'middle'
      });
      toast.present();
    }
  }
}
