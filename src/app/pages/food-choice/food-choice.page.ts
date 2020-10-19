import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-food-choice',
  templateUrl: './food-choice.page.html',
  styleUrls: ['./food-choice.page.scss'],
})
export class FoodChoicePage implements OnInit {
  foodNameList: Array<string>;
  foodNumberList: Array<number>;
  foodPriceList: Array<number>;
  foodPriceListString: Array<string>;
  foodMoney: number;
  foodMoneyString: string;

  constructor() {
    this.foodNameList = new Array<string>('Bắp', 'Nước', 'Kẹo', 'Gấu');
    this.foodPriceList = new Array<number>(5000, 2000, 3000, 500000);
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
}
