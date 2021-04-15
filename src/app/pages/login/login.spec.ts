import { LoginPage } from './login.page';
import { AuthenticationService } from 'src/app/services/shared/authentication.service';
import { NavController } from '@ionic/angular';

describe('Component: Login', () => {

    let component: LoginPage;
    let service: AuthenticationService;
    let nav: NavController;


    beforeEach(() => {
        component = new LoginPage(nav, service);
    });

    afterEach(() => {
        service = null;
        nav = null;
        component = null;
    });


    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
