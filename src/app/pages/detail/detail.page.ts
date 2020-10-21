import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  constructor() { }

  test1(){
    alert("dat ve");
  }

  test2(){
    alert("trang chu");
  }

  test3(){
    alert("danh sach");
  }

  ngOnInit() {
  }

}
