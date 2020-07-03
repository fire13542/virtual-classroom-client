import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonStudentComponent } from './lesson-student.component';

describe('LessonStudentComponent', () => {
  let component: LessonStudentComponent;
  let fixture: ComponentFixture<LessonStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
