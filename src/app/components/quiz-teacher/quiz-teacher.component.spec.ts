import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizTeacherComponent } from './quiz-teacher.component';

describe('QuizTeacherComponent', () => {
  let component: QuizTeacherComponent;
  let fixture: ComponentFixture<QuizTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
