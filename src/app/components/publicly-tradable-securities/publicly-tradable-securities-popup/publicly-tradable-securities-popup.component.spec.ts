import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubliclyTradableSecuritiesPopupComponent } from './publicly-tradable-securities-popup.component';

describe('PubliclyTradableSecuritiesPopupComponent', () => {
  let component: PubliclyTradableSecuritiesPopupComponent;
  let fixture: ComponentFixture<PubliclyTradableSecuritiesPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PubliclyTradableSecuritiesPopupComponent]
    });
    fixture = TestBed.createComponent(PubliclyTradableSecuritiesPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
