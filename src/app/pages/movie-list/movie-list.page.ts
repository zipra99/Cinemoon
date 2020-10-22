import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MovieListService } from 'src/app/services/movie-list.service';
import { TicketInfoService } from 'src/app/services/ticket-info.service';
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.page.html',
  styleUrls: ['./movie-list.page.scss'],
})
export class MovieListPage implements OnInit {
  dates: any;
  currDate: Date;
  listMovie: any[];
  listHotMovie: any[];
  colorName: string;

  constructor(
    public ticketInfo: TicketInfoService,
    public db: MovieListService,
    private navCtrl: NavController
  ) { }

  navMovieDetail(name: string){
    name = name.trim();
    this.db.keyName = name;
    this.db.chosenTime = this.currDate;
    this.navCtrl.navigateForward('detail');
  }

  navSeatChoice(movieDetail: any, time: string){
    this.ticketInfo.time = time;
    this.ticketInfo.movieDetail = movieDetail;
    this.ticketInfo.day = this.currDate;
    this.navCtrl.navigateForward('seat-choice');
  }

  switchDate(date: any, index: number){
    this.currDate = date.date;
    for(let i = 0; i < 7; i++){
      (document.getElementById(`date-${i}`) as HTMLScriptElement).style.backgroundColor = this.colorName;
    }
    (document.getElementById(`date-${index}`) as HTMLScriptElement).style.backgroundColor = 'rgb(230 34 64 / 82%)';
  }

  ngOnInit() {
    this.listMovie = this.db.listMovie;
    this.listHotMovie = this.db.listHotMovie;
    this.dates = this.db.generateDateArray();
    this.currDate = new Date();
  }

  ngAfterViewInit(){
    this.colorName = (document.getElementById('date-0') as HTMLScriptElement).style.backgroundColor;
    (document.getElementById('date-0') as HTMLScriptElement).style.backgroundColor = 'rgb(230 34 64 / 82%)';
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