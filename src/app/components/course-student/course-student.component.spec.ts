import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseStudentComponent } from './course-student.component';

describe('CourseStudentComponent', () => {
  let component: CourseStudentComponent;
  let fixture: ComponentFixture<CourseStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
