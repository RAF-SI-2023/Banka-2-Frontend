import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuturesContractsComponent } from './futures-contracts.component';

describe('FuturesContractsComponent', () => {
  let component: FuturesContractsComponent;
  let fixture: ComponentFixture<FuturesContractsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FuturesContractsComponent]
    });
    fixture = TestBed.createComponent(FuturesContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
