import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBankAccountComponent } from './create-bank-account.component';

describe('CreateBankAccountComponent', () => {
  let component: CreateBankAccountComponent;
  let fixture: ComponentFixture<CreateBankAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateBankAccountComponent]
    });
    fixture = TestBed.createComponent(CreateBankAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
