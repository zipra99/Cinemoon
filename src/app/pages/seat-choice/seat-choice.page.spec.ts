import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SeatChoicePage } from './seat-choice.page';

describe('SeatChoicePage', () => {
  let component: SeatChoicePage;
  let fixture: ComponentFixture<SeatChoicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeatChoicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SeatChoicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
