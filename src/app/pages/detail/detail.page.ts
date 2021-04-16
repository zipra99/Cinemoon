import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavController, NavParams } from '@ionic/angular';
import { MovieListService } from 'src/app/services/movie-list.service';
import { AuthenticationService } from 'src/app/services/shared/authentication.service';
import { TicketInfoService } from 'src/app/services/ticket-info.service';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.page.html',
    styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
    private movieDetail: any;
    private currDate: Date;
    private buttonValue: string;
    private isHiddenTicketTime = true;
    private isDisabconsticketButton = false;
    private reviewData: any = { listComment: [] };
    private newComment: string;

    constructor(
        public db: MovieListService,
        private navCtrl: NavController,
        public ticketInfo: TicketInfoService,
        public authService: AuthenticationService
    ) { }

    ngOnInit() {
        this.ticketInfo.refreshListSoldSeat();
        this.buttonValue = 'Đặt vé';
        this.movieDetail = this.db.getMovieDetail();
        this.currDate = this.db.chosenTime;
        this.getListComment();
        if (!this.movieDetail) {
            this.navCtrl.navigateBack('movie-list');
        }
    }

    getListComment() {
        const review = this.db.getReviewByMovieName(this.movieDetail.asciiName);
        review.subscribe(data => {
            if (data[0]) {
                this.reviewData = data[0];
            }
        });
    }

    pushNewCommnet() {
        const newComment = this.newComment;
        const newReviewData = this.reviewData;
        if (newComment) {
            const userDoc = this.authService.getCurrentUserInfo();

            if (userDoc) {
                userDoc.subscribe(user => {
                    if (!user) {
                        this.navCtrl.navigateBack('login');
                    } else {
                        if (!newReviewData.listComment.length) {
                            newReviewData.listComment.push({
                                comment: newComment,
                                displayName: user.displayName,
                                photoURL: user.photoURL
                            });
                            this.db.addNewReview(this.movieDetail.asciiName, newReviewData.listComment);
                        } else {
                            const review = this.db.getReviewById(newReviewData.id);
                            newReviewData.listComment.push({
                                comment: newComment,
                                displayName: user.displayName,
                                photoURL: user.photoURL
                            });
                            review.set(newReviewData);
                        }
                    }
                });
            } else {
                this.navCtrl.navigateBack('login');
            }
            this.getListComment();
            this.newComment = '';
        }
    }

    showTicketTime() {
        if (this.movieDetail.listTicket.length) {
            this.isHiddenTicketTime = false;
            this.isDisabconsticketButton = true;
        } else {
            this.buttonValue = 'Chưa được công chiếu';
            this.isDisabconsticketButton = true;
        }
    }

    navSeatChoice(movieDetail: any, time: string) {
        this.ticketInfo.time = time;
        this.ticketInfo.movieDetail = movieDetail;
        this.ticketInfo.day = this.currDate;
        this.navCtrl.navigateForward('seat-choice');
    }

    navigate(page) {
        switch (page) {
            case 'movie':
                this.navCtrl.navigateBack('movie-list');
                break;
            case 'home':
                this.navCtrl.navigateBack('home');
                break;
            case 'account':
                this.navCtrl.navigateForward('account-information');
                break;
            default:
                break;
        }
    }

    isPicked(time: string) {
        const toDay = new Date();
        if (toDay.getDate() !== this.currDate.getDate() ||
            toDay.getMonth() !== this.currDate.getMonth() || toDay.getFullYear() !== this.currDate.getFullYear()) {
            return false;
        }

        const now = new Date();
        const minute = Number(time.split(':')[0]);
        const second = Number(time.split(':')[1]);
        return (minute * 60 + second) < (now.getHours() * 60 + now.getMinutes());
    }

    formatAgeLimit(ageLimitStr: string): string {
        if (/^NC/.test(ageLimitStr)) {
            const age = ageLimitStr.slice(2);
            return `Nghiêm cấm dưới ${age} tuổi`;
        } else if (/^P$/.test(ageLimitStr)) {
            return 'Mọi lứa tuổi';
        } else {
            return '';
        }
    }
}
