import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import { AccountInformationPage } from './account-information.page';

import { NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/shared/authentication.service';

describe('AccountInformationPage', () => {
    // tslint:disable-next-line:one-variable-per-declaration
    let authService, navCtrl;

    beforeEach(async(() => {
        authService = { styleDefault: jest.fn() };
        navCtrl = { styleDefault: jest.fn() };

        TestBed.configureTestingModule({
            declarations: [AccountInformationPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                { provide: AuthenticationService, useValue: authService },
                { provide: NavController, useValue: navCtrl },
            ]
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AccountInformationPage);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    // TODO: add more tests!
});
