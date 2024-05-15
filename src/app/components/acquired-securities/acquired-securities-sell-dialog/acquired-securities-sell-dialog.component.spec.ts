import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcquiredSecuritiesSellDialogComponent } from './acquired-securities-sell-dialog.component';

describe('AcquiredSecuritiesSellDialogComponent', () => {
  let component: AcquiredSecuritiesSellDialogComponent;
  let fixture: ComponentFixture<AcquiredSecuritiesSellDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcquiredSecuritiesSellDialogComponent]
    });
    fixture = TestBed.createComponent(AcquiredSecuritiesSellDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
