import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureContractsComponent } from './future-contracts.component';

describe('FutureContractsComponent', () => {
  let component: FutureContractsComponent;
  let fixture: ComponentFixture<FutureContractsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FutureContractsComponent]
    });
    fixture = TestBed.createComponent(FutureContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
