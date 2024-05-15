import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubliclyTradableSecuritiesInfoDialogComponent } from './publicly-tradable-securities-info-dialog.component';

describe('PubliclyTradableSecuritiesInfoDialogComponent', () => {
  let component: PubliclyTradableSecuritiesInfoDialogComponent;
  let fixture: ComponentFixture<PubliclyTradableSecuritiesInfoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PubliclyTradableSecuritiesInfoDialogComponent]
    });
    fixture = TestBed.createComponent(PubliclyTradableSecuritiesInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
