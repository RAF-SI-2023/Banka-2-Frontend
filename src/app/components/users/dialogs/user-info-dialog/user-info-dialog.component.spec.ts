import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoDialogComponent } from './user-info-dialog.component';

describe('UserInfoDialogComponent', () => {
  let component: UserInfoDialogComponent;
  let fixture: ComponentFixture<UserInfoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserInfoDialogComponent]
    });
    fixture = TestBed.createComponent(UserInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
