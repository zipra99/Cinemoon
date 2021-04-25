import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AuthenticationService } from './authentication.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { firebaseConfig } from '../../../config';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

describe('Authentication Service', () => {
    let service: AuthenticationService;
    // tslint:disable-next-line:prefer-const
    let router: any;
    // tslint:disable-next-line:prefer-const
    let navCtrl: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(firebaseConfig),
                AngularFireDatabaseModule
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                { provide: Router, useValue: router },
                { provide: NavController, useValue: navCtrl }
            ]
        });
        service = TestBed.inject(AuthenticationService);
    });

    it('service should be created', () => {
        expect(service).toBeTruthy();
    });
});
