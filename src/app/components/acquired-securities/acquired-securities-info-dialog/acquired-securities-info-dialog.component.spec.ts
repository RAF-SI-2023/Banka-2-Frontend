import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcquiredSecuritiesInfoDialogComponent } from './acquired-securities-info-dialog.component';

describe('AcquiredSecuritiesInfoDialogComponent', () => {
  let component: AcquiredSecuritiesInfoDialogComponent;
  let fixture: ComponentFixture<AcquiredSecuritiesInfoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcquiredSecuritiesInfoDialogComponent]
    });
    fixture = TestBed.createComponent(AcquiredSecuritiesInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
