import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBlockStatusDialogComponent } from './card-block-status-dialog.component';

describe('CardBlockStatusDialogComponent', () => {
  let component: CardBlockStatusDialogComponent;
  let fixture: ComponentFixture<CardBlockStatusDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardBlockStatusDialogComponent]
    });
    fixture = TestBed.createComponent(CardBlockStatusDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
