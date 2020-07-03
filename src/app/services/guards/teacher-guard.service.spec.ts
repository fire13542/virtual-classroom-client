import { TestBed } from '@angular/core/testing';

import { TeacherGuard } from './teacher-guard.service';

describe('TeacherGuard', () => {
  let service: TeacherGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
