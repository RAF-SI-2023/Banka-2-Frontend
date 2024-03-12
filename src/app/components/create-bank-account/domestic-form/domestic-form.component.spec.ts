import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomesticFormComponent } from './domestic-form.component';

describe('DomesticFormComponent', () => {
  let component: DomesticFormComponent;
  let fixture: ComponentFixture<DomesticFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DomesticFormComponent]
    });
    fixture = TestBed.createComponent(DomesticFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
