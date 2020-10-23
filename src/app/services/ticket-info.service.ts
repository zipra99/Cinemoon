import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class TicketInfoService {
  movieDetail: any;
  day: Date;
  time: string;
  totalMoney: number;
  listSeatSold: any[];
  listSeatSoldName: any[];

  constructor(
    public afs: AngularFirestore
  ) {
    this.refreshListSoldSeat();
  }

  getStringMovieInfo() {
    let output: string[] = new Array();
    output.push(`Thể loại: ${this.movieDetail.categories.join(', ')}.`);
    output.push(`Suất ${this.time} - ${this.getDateFormatString(this.day)}.`);
    output.push(`Rạp Cinestar Đà Lạt`);
    output.push(`Giới hạn độ tuổi: ${this.movieDetail.ageLimit}`);
    output.push(`Phòng chiếu: 0${Math.floor(Math.random() * 6) + 1}`);
    return output;
  }

  getDateFormatString(day: Date){
    let output: string;
    let today = new Date();
    if(day.getDate() === today.getDate() && day.getMonth() === today.getMonth() && day.getFullYear() === day.getFullYear()){
      output = `Hôm nay, ${day.getDate()}/${day.getMonth() + 1}`;
    } else {
      switch(day.getDay()) {
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
    if(!this.listSeatSold) {
      return new Array();
    }
    let dayStr = `${this.day.getDate()}/${this.day.getMonth() + 1}`;
    for(let data of this.listSeatSold) {
      if(data.day === dayStr && data.time === this.time && data.name === this.movieDetail.asciiName) {
        return data.listSoldSeat;
      }
    }
    return new Array();
  }

  updateListSoldSeat(){
    let data: any;
    if(!this.listSeatSold || !this.listSeatSoldName) {
      return;
    }
    let dayStr = `${this.day.getDate()}/${this.day.getMonth() + 1}`;
      for(let item of this.listSeatSold) {
        if(item.day === dayStr && item.time === this.time && item.name === this.movieDetail.asciiName) {
          data = item;
        }
      }
    if(data){
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
}