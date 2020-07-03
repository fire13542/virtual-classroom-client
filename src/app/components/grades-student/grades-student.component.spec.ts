import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradesStudentComponent } from './grades-student.component';

describe('GradesStudentComponent', () => {
  let component: GradesStudentComponent;
  let fixture: ComponentFixture<GradesStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradesStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradesStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
