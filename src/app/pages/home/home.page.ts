import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MovieListService } from 'src/app/services/movie-list.service';
import { AuthenticationService } from 'src/app/services/shared/authentication.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    constructor(
        public authService: AuthenticationService,
        private navCtrl: NavController,
        public db: MovieListService
    ) { }
    public listMovie: any[];
    public listHotMovie: any[];
    public listComingSoonMovie: any[];

    options = {
        centeredSlides: true,
        loop: true,
        spaceBetween: -140,
    };

    options1 = {
        slidesPerView: 2
    };

    ngOnInit() {
        this.listMovie = this.db.listMovie;
        this.listHotMovie = this.db.listHotMovie;
        this.listComingSoonMovie = this.db.listComingSoonMovie;
    }

    navigate(page) {
        switch (page) {
            case 'movie':
                this.navCtrl.navigateForward('movie-list');
                break;
            case 'home':
                this.navCtrl.navigateForward('home');
                break;
            case 'account':
                this.navCtrl.navigateForward('account-information');
                break;
            default:
                break;
        }
    }

    navMovieDetail(name: string) {
        name = name.trim();
        this.db.keyName = name;
        this.db.chosenTime = new Date();
        this.navCtrl.navigateForward('detail');
    }
}
