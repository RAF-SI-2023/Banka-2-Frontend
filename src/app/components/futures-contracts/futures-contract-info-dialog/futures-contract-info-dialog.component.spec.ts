import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuturesContractInfoDialogComponent } from './futures-contract-info-dialog.component';

describe('FuturesContractInfoDialogComponent', () => {
  let component: FuturesContractInfoDialogComponent;
  let fixture: ComponentFixture<FuturesContractInfoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FuturesContractInfoDialogComponent]
    });
    fixture = TestBed.createComponent(FuturesContractInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
