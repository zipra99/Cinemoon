import { Injectable } from '@angular/core';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class TicketInfoService {
  movieDetail: any;
  day: Date;
  time: string;
  totalMoney: number;

  constructor() { }

  getStringMovieInfo() {
    let output: string[] = new Array();
    output.push(`Thể loại: ${this.movieDetail.categories.join(', ')}.`);
    output.push(`Suất ${this.time} - ${this.getDateFormatString(this.day)}.`);
    output.push(`Rạp Cinestar Đà Lạt`);
    output.push(`Phòng chiếu: 0${Math.floor(Math.random() * 6) + 1} - Ghế:`);
    return output;
  }

  getDateFormatString(day: Date){
    let output: string;
    let today = new Date();
    if(day.getDate() === today.getDate() && day.getMonth() === today.getMonth() && day.getFullYear() === day.getFullYear()){
      output = `Hôm nay, ${day.getDate()}/${day.getMonth()}`;
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
      output += `${day.getDate()}/${day.getMonth()}`;
    }
    return output;
  }
}