import { HomePage } from './home.page';
import { NavController } from '@ionic/angular';
import { MovieListService } from 'src/app/services/movie-list.service';
import { AuthenticationService } from 'src/app/services/shared/authentication.service';

describe('Component: HomePage', () => {

    let component: HomePage;
    let authService: AuthenticationService;
    let movieService: MovieListService;
    let nav: NavController;


    beforeEach(() => {
        component = new HomePage(authService, nav, movieService);
    });

    afterEach(() => {
        authService = null;
        movieService = null;
        nav = null;
        component = null;
    });


    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
