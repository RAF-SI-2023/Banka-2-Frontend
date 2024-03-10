import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperStocksComponent } from './paper-stocks.component';

describe('PaperStocksComponent', () => {
  let component: PaperStocksComponent;
  let fixture: ComponentFixture<PaperStocksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaperStocksComponent]
    });
    fixture = TestBed.createComponent(PaperStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
