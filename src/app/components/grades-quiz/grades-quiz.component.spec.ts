import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradesQuizComponent } from './grades-quiz.component';

describe('GradesQuizComponent', () => {
  let component: GradesQuizComponent;
  let fixture: ComponentFixture<GradesQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradesQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradesQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
