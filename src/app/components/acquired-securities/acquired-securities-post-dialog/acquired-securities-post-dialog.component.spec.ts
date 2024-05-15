import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcquiredSecuritiesPostDialogComponent } from './acquired-securities-post-dialog.component';

describe('AcquiredSecuritiesPostDialogComponent', () => {
  let component: AcquiredSecuritiesPostDialogComponent;
  let fixture: ComponentFixture<AcquiredSecuritiesPostDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcquiredSecuritiesPostDialogComponent]
    });
    fixture = TestBed.createComponent(AcquiredSecuritiesPostDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
