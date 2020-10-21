import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TicketInformationPage } from './ticket-information.page';

describe('TicketInformationPage', () => {
  let component: TicketInformationPage;
  let fixture: ComponentFixture<TicketInformationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketInformationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TicketInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
