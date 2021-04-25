import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { MovieListService } from './movie-list.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { firebaseConfig } from '../../config';

describe('MovieListService', () => {
    let service: MovieListService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(firebaseConfig),
                AngularFireDatabaseModule
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        });
        service = TestBed.inject(MovieListService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('test getListMovie', () => {
        expect(service.getListMovie()).toEqual([]);
    });
});
