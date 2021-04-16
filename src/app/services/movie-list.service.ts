import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class MovieListService {
    private days = ['CN', 'Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7'];
    public keyName = '';
    public chosenTime: Date;
    public listMovie: any[];
    public listHotMovie: any[];
    public listComingSoonMovie: any[];

    constructor(
        private afs: AngularFirestore
    ) {
        this.listMovie = this.getListMovie();
        this.listHotMovie = this.getListMovieByListName('hotMovies');
        this.listComingSoonMovie = this.getListMovieByListName('comingSoonMovies');
    }

    getListMovie() {
        const output = new Array();
        const snapshot = this.afs.collection('movies').snapshotChanges();
        snapshot.subscribe(data => {
            data.forEach(item => {
                output.push(item.payload.doc.data());
            });
        });
        return output;
    }

    getReviewByMovieName(movieName: string): Observable<any> {
        return this.afs.collection<any>('review', ref => ref.where('movieName', '==', movieName)).valueChanges();
    }

    getReviewById(id: string) {
        return this.afs.doc<any>(`review/${id}`);
    }

    addNewReview(movieName: string, listComment: any[]) {
        const newId = this.afs.createId();
        const reviewDoc = this.afs.doc<any>(`review/${newId}`);
        reviewDoc.set({
            id: newId,
            movieName,
            listComment
        });
    }

    getListMovieByListName(listName: string) {
        const output = new Array();
        const snapshot = this.afs.collection(listName).snapshotChanges();
        snapshot.subscribe(data => {
            data.forEach(item => {
                output.push(item.payload.doc.data());
            });
        });
        return output;
    }

    getMovieDetail() {
        for (const movie of this.listMovie) {
            if (movie.asciiName === this.keyName) {
                return movie;
            }
        }
        for (const movie of this.listHotMovie) {
            if (movie.asciiName === this.keyName) {
                return movie;
            }
        }
        for (const movie of this.listComingSoonMovie) {
            if (movie.asciiName === this.keyName) {
                return movie;
            }
        }
        return null;
    }

    generateDateArray() {
        const output = new Array(7);
        for (let i = 0; i < 7; i++) {
            const today = new Date();
            today.setDate(today.getDate() + i);
            output[i] = this.formatDateString(today);
        }
        return output;
    }

    formatDateString(date: Date) {
        return {
            dateStr: `${date.getDate()}/${date.getMonth() + 1}`,
            dayOfWeek: this.days[date.getDay()],
            date
        };
    }
}
