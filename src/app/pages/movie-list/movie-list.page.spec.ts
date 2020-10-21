import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MovieListPage } from './movie-list.page';

describe('MovieListPage', () => {
  let component: MovieListPage;
  let fixture: ComponentFixture<MovieListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
