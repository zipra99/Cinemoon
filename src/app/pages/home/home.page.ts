import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/shared/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    public authService: AuthenticationService,
    private navCtrl: NavController
  ) { }

  ngOnInit() { }

  navigate(page){
    switch(page){
      case 'movie':
        this.navCtrl.navigateForward('movie-list');
        break;
      case 'home':
        this.navCtrl.navigateForward('home');
        break;
      default:
        break;
    }
  }

  options = {
    centeredSlides: true,
    loop: true,
    spaceBetween: -140,
  };

  options1 = {
    slidesPerView: 2
  };


}
