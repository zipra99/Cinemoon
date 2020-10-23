import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccountInformationPage } from './account-information.page';

describe('AccountInformationPage', () => {
  let component: AccountInformationPage;
  let fixture: ComponentFixture<AccountInformationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountInformationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
