import { Component } from '@angular/core';
import { AuthenticationService } from '../services/shared/authentication.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    constructor(public authService: AuthenticationService) { }
}
