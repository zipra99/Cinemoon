import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.page.html',
  styleUrls: ['./movie-list.page.scss'],
})
export class MovieListPage implements OnInit {
  date: Array<string> = ["19/10","20/10","21/10","22/10","23/10"]
  movieslist: any;
  constructor(
    private router:Router,
  ) { }

  detail(id:String){
    id = id.trim();
    alert(id);
    // chuyển đến trang detail bằng id
    // this.router.navigateByUrl('details/' + id)
  }

  switchdate(date:String){
    alert(date)
  }

  ngOnInit() {
    fetch('./assets/data/movie.json').then(res => res.json())
    .then(json => {
      this.movieslist = json;
    });
  }

}
