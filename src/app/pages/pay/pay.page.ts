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
  backgroundColor: string;
  borderColor: string;
  movieDetail: string[];
  userInfo: any = {};
  method: any[] = [];

  constructor(
    private navCtrl: NavController,
    public toastController: ToastController,
    public authService: AuthenticationService,
    public ticketInfo: TicketInfoService) {
      this.method = this.getListMethod();
      this.totalMoneyString = ticketInfo.getTotalMoneyString();
      this.listBookingSeatString = ticketInfo.getBookingSeatString();
      this.listBookingFood = ticketInfo.bookingFoodList;
      this.bookingSeat = ticketInfo.getBookingSeatInfo();
      this.checkCurrentUserInfo();
    }

  switchMethod(index: number) {
    for (let i = 0; i < 4; i++) {
      (document.getElementById(`method-${i}`) as HTMLScriptElement).style.borderColor = this.borderColor;
      (document.getElementById(`method-${i}`) as HTMLScriptElement).style.backgroundColor = this.backgroundColor;
    }
    (document.getElementById(`method-${index}`) as HTMLScriptElement).style.borderColor = '#ff0000db';
    (document.getElementById(`method-${index}`) as HTMLScriptElement).style.backgroundColor = 'rgba(255, 0, 0, 0.86)';
  }

  getListMethod() {
    let output: any[] = [];
    output.push({ name: 'Thẻ Visa, MasterCard, JCB', icon: '../../../assets/icon/payment/visa.png'});
    output.push({ name: 'Thẻ ATM nội địa', icon: '../../../assets/icon/payment/noidia.png'});
    output.push({ name: 'Ví điện tử MOMO', icon: '../../../assets/icon/payment/momo.png'});
    output.push({ name: 'Thanh toán trực tiếp', icon: '../../../assets/icon/payment/tructiep.png'});
    return output;
  }

  ngOnInit() {
    this.movieDetail = this.ticketInfo.getStringMovieInfo();
  }

  ngAfterViewInit() {
    this.borderColor = (document.getElementById('method-0') as HTMLScriptElement).style.borderColor;
    this.backgroundColor = (document.getElementById('method-0') as HTMLScriptElement).style.backgroundColor;
    (document.getElementById('method-0') as HTMLScriptElement).style.borderColor = '#ff0000db';
    (document.getElementById('method-0') as HTMLScriptElement).style.backgroundColor = 'rgba(255, 0, 0, 0.86)';
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
