import { TestBed } from '@angular/core/testing';

import { LeavingConfirmationGuard } from './leaving-confirmation.guard';

describe('LeavingConfirmationGuard', () => {
  let guard: LeavingConfirmationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LeavingConfirmationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
