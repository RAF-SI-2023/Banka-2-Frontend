import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterbankTradableSecuritiesComponent } from './interbank-tradable-securities.component';

describe('InterbankTradableSecuritiesComponent', () => {
  let component: InterbankTradableSecuritiesComponent;
  let fixture: ComponentFixture<InterbankTradableSecuritiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterbankTradableSecuritiesComponent]
    });
    fixture = TestBed.createComponent(InterbankTradableSecuritiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
