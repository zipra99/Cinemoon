import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicketInfoService {
  totalMoney: string;

  constructor() {
    this.totalMoney = '0đ';
  }
}