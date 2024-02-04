import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { nonAuthGuard } from './non-auth.guard';

describe('nonAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => nonAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
