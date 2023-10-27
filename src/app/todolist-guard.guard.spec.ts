import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { todolistGuardGuard } from './todolist-guard.guard';

describe('todolistGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => todolistGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
