import { NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/shared/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-information',
  templateUrl: './account-information.page.html',
  styleUrls: ['./account-information.page.scss'],
})
export class AccountInformationPage implements OnInit {
  userInfo: any = {};

  constructor(
    public authService: AuthenticationService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.authService.checkIsLogin(false);
    let userDoc = this.authService.getCurrentUserInfo();
    if(userDoc) {
      userDoc.subscribe(data => {
        this.userInfo = data;
      });
    } else {
      this.navCtrl.navigateBack('login');
    }
  }
}
