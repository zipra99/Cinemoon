import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TicketInfoService } from 'src/app/services/ticket-info.service';

@Component({
  selector: 'app-seat-choice',
  templateUrl: './seat-choice.page.html',
  styleUrls: ['./seat-choice.page.scss'],
})
export class SeatChoicePage implements OnInit {
  rowList = ['A', 'B', 'C', 'D', 'E', 'F'];
  colList = ['1', '2', '3', '4', '5', '6', '7', '8'];
  public listBookingSeatString = '...';

  constructor(public ticketInfo: TicketInfoService, public toastController: ToastController) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.initSeatChoice();
  }

  initSeatChoice() {
    this.ticketInfo.bookedSeatList.forEach(item => {
      document.getElementById(item).setAttribute('color', 'dark');
    })
  }

  async press(row, col) {
    let result = await this.ticketInfo.changeSeat(row + col);
    let seat = document.getElementById(row + col);
    switch (result) {
      case 'booked':
        const bookedToast = await this.toastController.create({
          message: 'Ghế này đã có người đặt !!!',
          duration: 1000,
          position: 'middle'
        });
        bookedToast.present();
        return;
      case 'max':
        const maxToast = await this.toastController.create({
          message: 'Chỉ được đặt tối đa ' + this.ticketInfo.maxBookingSeat + ' ghế !!!',
          duration: 1000,
          position: 'middle'
        });
        maxToast.present();
        return;
      case 'added':
        seat.setAttribute('color', 'danger');
        break;
      case 'removed':
        seat.setAttribute('color', 'primary');
        break;
    }
    this.listBookingSeatString = this.ticketInfo.bookingSeatListToString();
  }
}