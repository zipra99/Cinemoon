import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {

  constructor() { }

  options = {
    centeredSlides: true,
    loop: true,
    spaceBetween: -140,
  };

  options1 = {
    slidesPerView: 2
  };

  ngOnInit() {
  }

}
