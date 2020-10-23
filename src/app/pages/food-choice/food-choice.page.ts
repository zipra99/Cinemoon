import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TicketInfoService } from 'src/app/services/ticket-info.service';

@Component({
  selector: 'app-food-choice',
  templateUrl: './food-choice.page.html',
  styleUrls: ['./food-choice.page.scss'],
})
export class FoodChoicePage implements OnInit {
  listBookingSeatString: string;
  foodNameList: Array<string>;
  foodNumberList: Array<number>;
  foodPriceList: Array<number>;
  foodPriceListString: Array<string>;
  foodMoney: number;
  foodMoneyString: string;

  constructor(
    private navCtrl: NavController,
    public ticketInfo: TicketInfoService) {
    this.listBookingSeatString = ticketInfo.getBookingSeatString();
    this.foodNameList = new Array<string>('Bắp', 'Nước', 'Kẹo');
    this.foodPriceList = new Array<number>(5000, 2000, 3000);
    this.foodNumberList = new Array<number>();
    this.foodNameList.forEach(item => {
      this.foodNumberList.push(0);
    });
    this.foodPriceListString = new Array<string>();
    this.foodPriceList.forEach(item => {
      this.foodPriceListString.push(item.toLocaleString('en').split(',').join('.') + 'đ');
    });
    this.foodMoney = 0;
    this.foodMoneyString = '0đ';
  }

  ngOnInit() {
  }
  plus(foodIndex) {
    if (this.foodNumberList[foodIndex] == 0)
      document.getElementById("minus" + foodIndex).setAttribute('color', 'primary');
    this.foodNumberList[foodIndex]++;
    this.calculateFoodMoney();
  }
  minus(foodIndex) {
    if (this.foodNumberList[foodIndex] > 0) {
      this.foodNumberList[foodIndex]--;
      this.calculateFoodMoney();
    }
    if (this.foodNumberList[foodIndex] == 0)
      document.getElementById("minus" + foodIndex).setAttribute('color', 'dark');
  }
  calculateFoodMoney() {
    let money = 0;
    for (let index = 0; index < this.foodNameList.length; index++) {
      money += this.foodNumberList[index] * this.foodPriceList[index];
    }
    this.foodMoney = money;
    this.foodMoneyString = money.toLocaleString('en').split(',').join('.') + 'đ';
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

  btnNext() {
    var bookingFoodList = new Array<string>();
    for (let i = 0; i < this.foodNameList.length; i++) {
      if (this.foodNumberList[i] > 0)
        bookingFoodList.push(this.foodNameList[i] + '|' + this.foodNumberList[i] + '|' + this.foodPriceList[i] * this.foodNumberList[i])
    }
    this.ticketInfo.setBookingFoodInfo(bookingFoodList, this.foodMoney);
    this.navCtrl.navigateForward('pay');
  }
}