import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/shared/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    public authService: AuthenticationService
    ) { }

  ngOnInit() {
    this.authService.checkIsLogin(true);
  }

  navRegistrationPage(){
    this.navCtrl.navigateForward('/registration');
  }

  logIn(email, password) {
    this.authService.SignIn(email.value.trim(), password.value.trim())
      .then((res) => {
        if (res.user.emailVerified) {
          this.authService.checkUserEmailVerify('email', res.user.email);
          this.navCtrl.navigateBack(['home']);
        } else {
          window.alert('Email chưa được chứng thực')
          return false;
        }
      }).catch((error) => {
        window.alert(error.message)
      })
  }

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
}
