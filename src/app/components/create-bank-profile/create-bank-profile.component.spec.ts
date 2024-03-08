import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBankProfileComponent } from './create-bank-profile.component';

describe('CreateBankProfileComponent', () => {
  let component: CreateBankProfileComponent;
  let fixture: ComponentFixture<CreateBankProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateBankProfileComponent]
    });
    fixture = TestBed.createComponent(CreateBankProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
