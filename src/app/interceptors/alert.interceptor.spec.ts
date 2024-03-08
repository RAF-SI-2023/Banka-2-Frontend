import { TestBed } from '@angular/core/testing';

import { AlertInterceptor } from './alert.interceptor';

describe('AlertInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AlertInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AlertInterceptor = TestBed.inject(AlertInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
