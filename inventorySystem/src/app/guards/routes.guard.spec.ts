import { TestBed } from '@angular/core/testing';

import { routesGuard } from './routes.guard';

describe('routesGuard', () => {
  let guard: routesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [routesGuard]
    });
    guard = TestBed.inject(routesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true from canActivate', () => {
    expect(guard.canActivate()).toBeTruthy();  // Comprueba la función canActivate
  });
});
