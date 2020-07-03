import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsOfCourseComponent } from './students-of-course.component';

describe('StudentsOfCourseComponent', () => {
  let component: StudentsOfCourseComponent;
  let fixture: ComponentFixture<StudentsOfCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsOfCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsOfCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
