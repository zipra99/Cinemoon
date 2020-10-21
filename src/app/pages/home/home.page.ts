import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/shared/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    public authService: AuthenticationService
  ) { }

  ngOnInit() { }

  options = {
    centeredSlides: true,
    loop: true,
    spaceBetween: -140,
  };

  options1 = {
    slidesPerView: 2
  };


}
