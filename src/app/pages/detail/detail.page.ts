import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavController, NavParams } from '@ionic/angular';
import { MovieListService } from 'src/app/services/movie-list.service';
import { TicketInfoService } from 'src/app/services/ticket-info.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  movieDetail: any;
  currDate: Date;
  buttonValue: string;
  isHiddenTicketTime: boolean = true;
  isDisableTicketButton: boolean = false;

  constructor(
    public db: MovieListService,
    private navCtrl: NavController,
    public ticketInfo: TicketInfoService
  ) { }

  ngOnInit() {
    this.ticketInfo.refreshListSoldSeat();
    this.buttonValue = 'Đặt vé';
    this.movieDetail = this.db.getMovieDetail();
    this.currDate = this.db.chosenTime;
    if(!this.movieDetail) {
      this.navCtrl.navigateBack('movie-list');
    }
  }

  showTicketTime() {
    if(this.movieDetail.listTicket.length){
      this.isHiddenTicketTime = false;
      this.isDisableTicketButton = true;
    } else {
      this.buttonValue = 'Chưa được công chiếu';
      this.isDisableTicketButton = true;
    }
  }

  navSeatChoice(movieDetail: any, time: string){
    this.ticketInfo.time = time;
    this.ticketInfo.movieDetail = movieDetail;
    this.ticketInfo.day = this.currDate;
    this.navCtrl.navigateForward('seat-choice');
  }

  navigate(page){
    switch(page){
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

  isPicked(time: string){
    let toDay = new Date();
    if(toDay.getDate() !== this.currDate.getDate() || toDay.getMonth() !== this.currDate.getMonth() || toDay.getFullYear() !== this.currDate.getFullYear()) {
      return false;
    }

    let now = new Date();
    let minute = Number(time.split(':')[0]);
    let second = Number(time.split(':')[1]);
    return (minute*60 + second) < (now.getHours()*60 + now.getMinutes());
  }
}
