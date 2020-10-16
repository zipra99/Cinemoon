import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NavController } from '@ionic/angular';
import { AuthenticationService } from "src/app/services/shared/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public authService: AuthenticationService, public router: Router) { }

  ngOnInit() { }

  logIn(email, password) {
    this.authService.SignIn(email.value, password.value)
      .then((res) => {
        if (res.user.emailVerified) {
          this.router.navigate(['home']);
        } else {
          window.alert('Email chưa được chứng thực')
          return false;
        }
      }).catch((error) => {
        window.alert(error.message)
      })
  }
}
