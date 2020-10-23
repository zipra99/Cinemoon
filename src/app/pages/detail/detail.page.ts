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
  movieDetail: any;
  currDate: Date;
  buttonValue: string;
  isHiddenTicketTime: boolean = true;
  isDisableTicketButton: boolean = false;
  reviewData: any = { listComment: [] };
  newComment: string;

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
    let review = this.db.getReviewByMovieName(this.movieDetail.asciiName);
    review.subscribe(data => {
      if (data[0]) {
        this.reviewData = data[0];
      }
    })
  }

  pushNewCommnet() {
    let newComment = this.newComment;
    if (newComment) {
      let userDoc = this.authService.getCurrentUserInfo();

      if (userDoc) {
        userDoc.subscribe(user => {
          if (!user) {
            this.navCtrl.navigateBack('login');
          } else {
            if(!this.reviewData.listComment.length) {
              this.reviewData.listComment.push({
                comment: newComment,
                displayName: user.displayName,
                photoURL: user.photoURL
              });
              this.db.addNewReview(this.movieDetail.asciiName, this.reviewData.listComment);
            } else {
              let review = this.db.getReviewById(this.reviewData.id);
              this.reviewData.listComment.push({
                comment: newComment,
                displayName: user.displayName,
                photoURL: user.photoURL
              });
              review.set(this.reviewData);
            }
          }
        })
      } else {
        this.navCtrl.navigateBack('login');
      }
      this.newComment = '';
    }
  }

  showTicketTime() {
    if (this.movieDetail.listTicket.length) {
      this.isHiddenTicketTime = false;
      this.isDisableTicketButton = true;
    } else {
      this.buttonValue = 'Chưa được công chiếu';
      this.isDisableTicketButton = true;
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
    let toDay = new Date();
    if (toDay.getDate() !== this.currDate.getDate() || toDay.getMonth() !== this.currDate.getMonth() || toDay.getFullYear() !== this.currDate.getFullYear()) {
      return false;
    }

    let now = new Date();
    let minute = Number(time.split(':')[0]);
    let second = Number(time.split(':')[1]);
    return (minute * 60 + second) < (now.getHours() * 60 + now.getMinutes());
  }

  formatAgeLimit(ageLimitStr: string): string {
    if (/^NC/.test(ageLimitStr)) {
      let age = ageLimitStr.slice(2);
      return `Nghiêm cấm dưới ${age} tuổi`;
    } else if (/^P$/.test(ageLimitStr)) {
      return 'Mọi lứa tuổi';
    } else {
      return '';
    }
  }
}
