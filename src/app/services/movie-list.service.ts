import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})

export class MovieListService {
  private days = ['CN', 'Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7'];
  public keyName: string = '';
  public chosenTime: Date;
  public listMovie: any[];
  public listHotMovie: any[];

  constructor(
    private afs: AngularFirestore
  ) {
    this.listMovie = this.getListMovie();
    this.listHotMovie = this.getListMovieByListName('hotMovies');
  }

  getListMovie() {
    let output = new Array();
    let snapshot = this.afs.collection('movies').snapshotChanges();
    snapshot.subscribe(data => {
      data.forEach(item => {
        output.push(item.payload.doc.data());
      })
    })
    return output;
  }

  getListMovieByListName(listName: string) {
    let output = new Array();
    let snapshot = this.afs.collection(listName).snapshotChanges();
    snapshot.subscribe(data => {
      data.forEach(item => {
        output.push(item.payload.doc.data());
      })
    })
    return output;
  }

  getMovieDetail() {
    for(let movie of this.listMovie) {
      if(movie.asciiName === this.keyName) {
        return movie;
      }
    }
    return null;
  }

  generateDateArray() {
    let output = new Array(7);
    for (let i = 0; i < 7; i++) {
      let today = new Date();
      today.setDate(today.getDate() + i);
      output[i] = this.formatDateString(today);
    }
    return output;
  }

  formatDateString(date: Date) {
    return {
      dateStr: `${date.getDate()}/${date.getMonth()}`,
      dayOfWeek: this.days[date.getDay()],
      date: date
    };
  }
}