import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForexComponent } from './forex.component';

describe('ForexComponent', () => {
  let component: ForexComponent;
  let fixture: ComponentFixture<ForexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForexComponent]
    });
    fixture = TestBed.createComponent(ForexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
