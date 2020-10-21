import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieListService } from 'src/app/services/movie-list.service';
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.page.html',
  styleUrls: ['./movie-list.page.scss'],
})
export class MovieListPage implements OnInit {
  dates: any;
  currDate: Date;
  movieslist: any;
  colorName: string;
  constructor(
    private router:Router,
    private db: MovieListService
  ) { }

  detail(id:String){
    id = id.trim();
    alert(id);
  }

  switchDate(date: any, index: number){
    this.currDate = date.date;
    for(let i = 0; i < 7; i++){
      (document.getElementById(`date-${i}`) as HTMLScriptElement).style.backgroundColor = this.colorName;
    }
    (document.getElementById(`date-${index}`) as HTMLScriptElement).style.backgroundColor = 'aliceblue';
  }

  ngOnInit() {
    this.movieslist = this.db.getListMovie();
    this.dates = this.db.generateDateArray();
    this.currDate = new Date();
  }

  ngAfterViewInit(){
    this.colorName = (document.getElementById('date-0') as HTMLScriptElement).style.backgroundColor;
    (document.getElementById('date-0') as HTMLScriptElement).style.backgroundColor = 'aliceblue';
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