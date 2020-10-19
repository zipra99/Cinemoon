import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {

  constructor(
    private router: Router,
  ) { }

  Register(){
    this.router.navigateByUrl('/register-page');
  }

  ngOnInit() {
  }

}
