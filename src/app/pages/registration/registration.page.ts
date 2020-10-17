import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/shared/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  username: string;
  email: string;
  password: string;

  constructor(
    public authService: AuthenticationService,
    public navCtrl: NavController
  ) { }

  ngOnInit() { }

  signUp() {
    this.authService.RegisterUser(this.email, this.password)
      .then((res) => {
        this.authService.SendVerificationMail();
      }).catch((error) => {
        window.alert(error.message)
      })
  }
}