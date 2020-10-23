import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FoodChoicePage } from './food-choice.page';

describe('FoodChoicePage', () => {
  let component: FoodChoicePage;
  let fixture: ComponentFixture<FoodChoicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodChoicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FoodChoicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
