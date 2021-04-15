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
    totalMoney: number;
    moneyString: string;
    movieDetail: string[];

    constructor(
        private navCtrl: NavController,
        public ticketInfo: TicketInfoService
    ) {
        this.listBookingSeatString = ticketInfo.getBookingSeatString();
        this.foodNameList = ticketInfo.foodData.listName;
        this.foodPriceList = ticketInfo.foodData.listPrice;
        this.foodNumberList = new Array<number>();
        this.foodNameList.forEach(item => {
            this.foodNumberList.push(0);
        });
        this.foodPriceListString = new Array<string>();
        this.foodPriceList.forEach(item => {
            this.foodPriceListString.push(item.toLocaleString('en').split(',').join('.') + 'đ');
        });
        this.totalMoney = ticketInfo.totalMoney;
        this.moneyString = ticketInfo.getTotalMoneyString();
    }

    ngOnInit() {
        this.movieDetail = this.ticketInfo.getStringMovieInfo();
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
        let money = this.ticketInfo.totalMoney;
        for (let index = 0; index < this.foodNameList.length; index++) {
            money += this.foodNumberList[index] * this.foodPriceList[index];
        }
        this.totalMoney = money;
        this.moneyString = money.toLocaleString('en').split(',').join('.') + 'đ';
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
        const bookingFoodList: any[] = [];
        for (let i = 0; i < this.foodNameList.length; i++) {
            if (this.foodNumberList[i] > 0) {
                bookingFoodList.push({
                    name: this.foodNameList[i],
                    number: this.foodNumberList[i],
                    price: (this.foodPriceList[i] * this.foodNumberList[i]).toLocaleString('en').split(',').join('.') + 'đ'
                });
            }
        }
        this.ticketInfo.totalMoney = this.totalMoney;
        this.ticketInfo.bookingFoodList = bookingFoodList;
        this.navCtrl.navigateForward('pay');
    }
}
