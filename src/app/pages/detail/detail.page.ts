import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavController, NavParams } from '@ionic/angular';
import { MovieListService } from 'src/app/services/movie-list.service';

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
    private navCtrl: NavController
  ) { }

  test3(){
    alert("danh sach");
  }

  ngOnInit() {
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

  navigate(page){
    switch(page){
      case 'movie':
        this.navCtrl.navigateBack('movie-list');
        break;
      case 'home':
        this.navCtrl.navigateBack('home');
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
