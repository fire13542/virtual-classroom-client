import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonTeacherComponent } from './lesson-teacher.component';

describe('LessonTeacherComponent', () => {
  let component: LessonTeacherComponent;
  let fixture: ComponentFixture<LessonTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
