import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NavController, Platform } from '@ionic/angular';
import { AuthenticationService } from "src/app/services/shared/authentication.service";
//import { VerifyEmailPage } from '../verify-email/verify-email.page';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  constructor(public authService: AuthenticationService, public router: Router, public navCtrl: NavController, public platform: Platform) { }

  async initializeApp(): Promise<void> {
    await this.platform.ready();

    this.platform.backButton.subscribeWithPriority(1, () => {});
  }

  ngOnInit() { }

  signUp(email, password) {
    this.authService.RegisterUser(email.value, password.value)
      .then((res) => {
        this.authService.SendVerificationMail();
        this.navCtrl.navigateBack('verify-email');
      }).catch((error) => {
        window.alert(error.message)
      })
  }
}
