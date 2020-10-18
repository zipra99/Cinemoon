import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicketInfoService {
  bookingSeatList: Array<string>;
  bookedSeatList: Array<string>;
  ticketPrice: number;
  foodNameList: Array<string>;
  foodNumberList: Array<number>;
  foodPriceList: Array<number>;
  public maxBookingSeat: number;
  public totalMoney: string;

  constructor() {
    this.ticketPrice = 45000;
    this.maxBookingSeat = 8;
    this.bookingSeatList = new Array<string>();
    this.bookedSeatList = new Array<string>('C3', 'D4', 'F7');
    this.foodNameList = new Array<string>('a', 'b', 'c');
    this.foodNumberList = new Array<number>(0, 0, 0);
    this.foodPriceList = new Array<number>(5000, 2000, 3000);
    this.totalMoney = '0';
  }

  async changeSeat(seat) {
    if (this.bookedSeatList.includes(seat))
      return 'booked';
    let index = this.bookingSeatList.indexOf(seat);
    if (index >= 0) {
      this.bookingSeatList.splice(index, 1);
      this.totalMoney = this.calculateMoney();
      return 'removed';
    }
    if (this.bookingSeatList.length >= this.maxBookingSeat)
      return 'max';
    else {
      this.bookingSeatList.push(seat);
      this.totalMoney = this.calculateMoney();
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

  changeFood(name, number) {
    this.foodNumberList[this.foodNameList.indexOf(name)] = number;
    this.totalMoney = this.calculateMoney();
  }
  calculateMoney() {
    var money = 0;
    for (let index = 0; index < this.foodNameList.length; index++) {
      money += this.foodNumberList[index] * this.foodPriceList[index];
    }
    money += this.bookingSeatList.length * this.ticketPrice;
    return money.toLocaleString('en').split(',').join('.') + ' VNĐ';
  }
}