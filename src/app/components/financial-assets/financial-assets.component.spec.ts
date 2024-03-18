import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialAssetsComponent } from './financial-assets.component';

describe('FinancialAssetsComponent', () => {
  let component: FinancialAssetsComponent;
  let fixture: ComponentFixture<FinancialAssetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinancialAssetsComponent]
    });
    fixture = TestBed.createComponent(FinancialAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
