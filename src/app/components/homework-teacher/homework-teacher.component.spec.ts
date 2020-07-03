import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeworkTeacherComponent } from './homework-teacher.component';

describe('HomeworkTeacherComponent', () => {
  let component: HomeworkTeacherComponent;
  let fixture: ComponentFixture<HomeworkTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeworkTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeworkTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
