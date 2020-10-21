import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/shared/authentication.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {
  TIME: number = 15;
  counter = {
    time: 0,
    displayValue: `(${this.TIME})`
  }

  constructor(
    public authService: AuthenticationService,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    let btnGoToLogin = (document.getElementById('go-to-login') as HTMLInputElement);
    btnGoToLogin.disabled = true;
    this.counter.time = this.TIME;
    setInterval(() => {
      if(this.counter.time === 0){
        btnGoToLogin.disabled = false;
        this.counter.displayValue = '';
        return;
      }
      //this.counter.time--;
      this.counter.displayValue = `(${--this.counter.time})`;
    }, 1000);
  }

  navLoginPage(){
    this.navCtrl.navigateBack('login');
  }
}
