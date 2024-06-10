import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarginAccountsComponent } from './margin-accounts.component';

describe('MarginAccountsComponent', () => {
  let component: MarginAccountsComponent;
  let fixture: ComponentFixture<MarginAccountsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarginAccountsComponent]
    });
    fixture = TestBed.createComponent(MarginAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
