import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMarginAccountDialogComponent } from './edit-margin-account-dialog.component';

describe('EditMarginAccountDialogComponent', () => {
  let component: EditMarginAccountDialogComponent;
  let fixture: ComponentFixture<EditMarginAccountDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMarginAccountDialogComponent]
    });
    fixture = TestBed.createComponent(EditMarginAccountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
