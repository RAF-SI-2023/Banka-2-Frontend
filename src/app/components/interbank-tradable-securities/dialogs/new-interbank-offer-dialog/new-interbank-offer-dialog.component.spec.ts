import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInterbankOfferDialogComponent } from './new-interbank-offer-dialog.component';

describe('NewInterbankOfferDialogComponent', () => {
  let component: NewInterbankOfferDialogComponent;
  let fixture: ComponentFixture<NewInterbankOfferDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewInterbankOfferDialogComponent]
    });
    fixture = TestBed.createComponent(NewInterbankOfferDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
