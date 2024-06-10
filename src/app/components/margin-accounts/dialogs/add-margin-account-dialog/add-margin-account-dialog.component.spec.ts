import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMarginAccountDialogComponent } from './add-margin-account-dialog.component';

describe('AddMarginAccountDialogComponent', () => {
  let component: AddMarginAccountDialogComponent;
  let fixture: ComponentFixture<AddMarginAccountDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMarginAccountDialogComponent]
    });
    fixture = TestBed.createComponent(AddMarginAccountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
