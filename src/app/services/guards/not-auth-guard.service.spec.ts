import { TestBed } from '@angular/core/testing';

import { NotAuthGuard } from './not-auth-guard.service';

describe('NotAuthGuard', () => {
  let service: NotAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotAuthGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
