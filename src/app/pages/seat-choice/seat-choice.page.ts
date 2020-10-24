import { Component, OnInit } from '@angular/core';
import { NavComponentWithProps, NavController, ToastController } from '@ionic/angular';
import { TicketInfoService } from 'src/app/services/ticket-info.service';

@Component({
  selector: 'app-seat-choice',
  templateUrl: './seat-choice.page.html',
  styleUrls: ['./seat-choice.page.scss'],
})
export class SeatChoicePage implements OnInit {
  rowList = ['A', 'B', 'C', 'D', 'E', 'F'];
  colList = ['1', '2', '3', '4', '5', '6', '7', '8'];
  listBookingSeatString = '...';
  bookingSeatList: any[];
  bookedSeatList: Array<string>;
  ticketPrice: number;
  maxBookingSeat: number;
  totalMoney: number;
  moneyString: string;
  movieDetail: string[];

  constructor(
    public ticketInfo: TicketInfoService,
    public toastController: ToastController,
    private navCtrl: NavController) {
    this.ticketPrice = ticketInfo.ticketPrice;
    this.maxBookingSeat = 8;
    this.bookingSeatList = [];
    this.totalMoney = 0;
    this.moneyString = '0đ';
  }

  ngOnInit() {
    this.movieDetail = this.ticketInfo.getStringMovieInfo();
    this.bookedSeatList = this.ticketInfo.getListSoldSeatName();
  }

  ngAfterViewInit() {
    if (this.bookedSeatList) {
      this.bookedSeatList.forEach(item => {
        document.getElementById(item).setAttribute('style', '--background:#100e0e');
      })
    }
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

  async press(row, col) {
    let result = await this.changeSeat(row + col);
    let seat = document.getElementById(row + col);
    switch (result) {
      case 'booked':
        const bookedToast = await this.toastController.create({
          message: 'Ghế này đã có người đặt.',
          duration: 1000,
          position: 'middle'
        });
        bookedToast.present();
        return;
      case 'max':
        const maxToast = await this.toastController.create({
          message: 'Chỉ được đặt tối đa ' + this.maxBookingSeat + ' ghế !!!',
          duration: 1000,
          position: 'middle'
        });
        maxToast.present();
        return;
      case 'added':
        seat.setAttribute('style', '--background:#ff4961');
        break;
      case 'removed':
        seat.setAttribute('style', '--background:rgb(128 67 67 / 38%)');
        break;
    }
    this.listBookingSeatString = this.bookingSeatListToString();
  }
  async changeSeat(seat) {
    if (this.bookedSeatList.includes(seat))
      return 'booked';
    let index = this.bookingSeatList.indexOf(seat);
    if (index >= 0) {
      this.bookingSeatList.splice(index, 1);
      this.calculateSeatMoney();
      return 'removed';
    }
    if (this.bookingSeatList.length >= this.maxBookingSeat)
      return 'max';
    else {
      this.bookingSeatList.push(seat);
      this.calculateSeatMoney();
      return 'added';
    }
  }
  bookingSeatListToString() {
    let output: string = '';
    this.bookingSeatList.forEach(item => {
      output += item + ', ';
    })
    output = output.slice(0, output.length - 2);
    if (output == '')
      output = '...';
    return output;
  }
  calculateSeatMoney() {
    let money = this.bookingSeatList.length * this.ticketPrice;
    this.totalMoney = money;
    this.moneyString = money.toLocaleString('en').split(',').join('.') + 'đ';
  }

  async btnNext() {
    if (this.bookingSeatList.length) {
      this.ticketInfo.totalMoney = this.totalMoney;
      this.ticketInfo.bookingSeatList = this.bookingSeatList;
      this.ticketInfo.listSeatSoldName = this.bookedSeatList.concat(this.bookingSeatList);
      this.navCtrl.navigateForward('food-choice');
    } else {
      const maxToast = await this.toastController.create({
        message: 'Vui lòng chọn ghế để tiếp tục!',
        duration: 1000,
        position: 'middle'
      });
      maxToast.present();
    }
  }
}