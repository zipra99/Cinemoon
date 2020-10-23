import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/shared/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  fullName: string;
  email: string;
  password: string;
  passwordRepeat: string;

  constructor(
    public authService: AuthenticationService,
    public navCtrl: NavController,
    public platform: Platform
  ) { }

  ngOnInit() { }

  async initializeApp(): Promise<void> {
    await this.platform.ready();

    this.platform.backButton.subscribeWithPriority(1, () => { });
  }

  navLoginPage() {
    this.navCtrl.navigateBack('/login');
  }

  signUp() {
    if(!this.fullName && !this.email && !this.password && !this.passwordRepeat) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }
    if(this.password !== this.passwordRepeat) {
      alert('Mật khẩu không giống nhau!');
      return;
    }
    this.authService.RegisterUser(this.email, this.password,)
      .then((res) => {
        this.authService.createNewUser(res.user, this.fullName);
        this.authService.SendVerificationMail();
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