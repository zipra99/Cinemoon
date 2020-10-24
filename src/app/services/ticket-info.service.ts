import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TicketInfoService {
  movieDetail: any;
  day: Date;
  time: string;
  ticketPrice: number;
  totalMoney: number;
  listSeatSold: any[];
  listSeatSoldName: any[];
  bookingSeatList: any[];
  bookingSeatMoney: number;
  bookingFoodList: any[];
  bookingFoodMoney: number;
  userInfo: any = {};
  urlQRCode: string;
  foodData: any = {};

  constructor(public afs: AngularFirestore) {
    this.bookingSeatList = [];
    this.bookingFoodList = [];
    this.refreshListSoldSeat();
    this.ticketPrice = 75000;
    this.getListFoodFromFirebase();
  }

  getListFoodFromFirebase() {
    this.foodData = {
      listName: [],
      listPrice: []
    };
    let foodDoc = this.afs.doc<any>('foods/4820d1zy7KK4XL4OGcqp').valueChanges();
    if(foodDoc) {
      foodDoc.subscribe(data => {
        for(let item of data.listFood) {
          this.foodData.listName.push(item.split('|')[0]);
          this.foodData.listPrice.push(item.split('|')[1]);
        }
      })
    }
  }

  getStringMovieInfo() {
    let output: string[] = new Array();
    output.push(`Thể loại: ${this.movieDetail.categories.join(', ')}.`);
    output.push(`Suất ${this.time} - ${this.getDateFormatString(this.day)}.`);
    output.push(`Rạp Cinestar Đà Lạt`);
    output.push(`Giới hạn độ tuổi: ${this.movieDetail.ageLimit}`);
    output.push(`Phòng chiếu: 0${Math.floor(Math.random() * 6) + 1}`);
    output.push(`Ghế: ${this.getBookingSeatString()}`);
    return output;
  }

  getDateFormatString(day: Date) {
    let output: string;
    let today = new Date();
    if (day.getDate() === today.getDate() && day.getMonth() === today.getMonth() && day.getFullYear() === day.getFullYear()) {
      output = `Hôm nay, ${day.getDate()}/${day.getMonth() + 1}`;
    } else {
      switch (day.getDay()) {
        case 0:
          output = 'Chủ nhật, ';
          break;
        case 1:
          output = 'Thứ hai, ';
          break;
        case 2:
          output = 'Thứ ba, ';
          break;
        case 3:
          output = 'Thứ tư, ';
          break;
        case 4:
          output = 'Thứ năm, ';
          break;
        case 5:
          output = 'Thứ sáu, ';
          break;
        case 6:
          output = 'Thứ bảy, ';
          break;
      }
      output += `${day.getDate()}/${day.getMonth() + 1}`;
    }
    return output;
  }

  refreshListSoldSeat() {
    this.listSeatSold = this.getListSoldSeat();
  }

  getListSoldSeat() {
    let output = new Array();
    let snapshot = this.afs.collection('seatChoice').snapshotChanges();
    snapshot.subscribe(data => {
      data.forEach(item => {
        output.push(item.payload.doc.data());
      })
    })
    return output;
  }

  getListSoldSeatName() {
    if (!this.listSeatSold) {
      return new Array();
    }
    let dayStr = `${this.day.getDate()}/${this.day.getMonth() + 1}`;
    for (let data of this.listSeatSold) {
      if (data.day === dayStr && data.time === this.time && data.name === this.movieDetail.asciiName) {
        return data.listSoldSeat;
      }
    }
    return new Array();
  }

  updateListSoldSeat() {
    let data: any;
    if (!this.listSeatSold || !this.listSeatSoldName) {
      return;
    }
    let dayStr = `${this.day.getDate()}/${this.day.getMonth() + 1}`;
    for (let item of this.listSeatSold) {
      if (item.day === dayStr && item.time === this.time && item.name === this.movieDetail.asciiName) {
        data = item;
      }
    }
    if (data) {
      let userDoc = this.afs.doc<any>(`seatChoice/${data.id}`);
      userDoc.update({
        listSoldSeat: this.listSeatSoldName
      })
    } else {
      let docId = this.afs.createId();
      let userDoc = this.afs.doc<any>(`seatChoice/${docId}`);
      userDoc.set({
        id: docId,
        time: this.time,
        day: `${this.day.getDate()}/${this.day.getMonth() + 1}`,
        name: this.movieDetail.asciiName,
        listSoldSeat: this.listSeatSoldName
      })
    }
  }

  getBookingSeatInfo(): any{
    return {
      name: 'Ghế',
      number: this.bookingSeatList.length,
      price: (this.bookingSeatList.length * this.ticketPrice).toLocaleString('en').split(',').join('.') + 'đ'
    };
  }

  getBookingSeatString() {
    return this.bookingSeatList.join(', ');
  }

  getTotalMoneyString() {
    return this.totalMoney.toLocaleString('en').split(',').join('.') + 'đ';
  }

  randomQRCodeUrl(length) {
    let output = 'https://api.qrserver.com/v1/create-qr-code/?size=512x512&data=';
    let randomStr = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      randomStr += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return output + randomStr;
  }
}