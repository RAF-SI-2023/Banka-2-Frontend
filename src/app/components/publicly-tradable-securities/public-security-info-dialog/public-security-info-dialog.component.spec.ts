import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicSecurityInfoDialogComponent } from './public-security-info-dialog.component';

describe('PublicSecurityInfoDialogComponent', () => {
  let component: PublicSecurityInfoDialogComponent;
  let fixture: ComponentFixture<PublicSecurityInfoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicSecurityInfoDialogComponent]
    });
    fixture = TestBed.createComponent(PublicSecurityInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
