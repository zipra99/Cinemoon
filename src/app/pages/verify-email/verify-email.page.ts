import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from "src/app/services/shared/authentication.service";

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {
  time: number;

  constructor(public authService: AuthenticationService, public navCtrl: NavController) { }

  ngOnInit() {
    let btnGoToLogin = (document.getElementById('go-to-login') as HTMLInputElement);
    btnGoToLogin.disabled = true;
    this.time = 5;
    setInterval(() => {
      if(this.time === 0){
        btnGoToLogin.disabled = false;
        return;
      }
      this.time--;
    }, 1000);
  }

  navLoginPage(){
    this.navCtrl.navigateBack('login');
  }
}
