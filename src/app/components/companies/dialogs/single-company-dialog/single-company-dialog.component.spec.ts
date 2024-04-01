import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCompanyDialogComponent } from './single-company-dialog.component';

describe('SingleCompanyDialogComponent', () => {
  let component: SingleCompanyDialogComponent;
  let fixture: ComponentFixture<SingleCompanyDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleCompanyDialogComponent]
    });
    fixture = TestBed.createComponent(SingleCompanyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
