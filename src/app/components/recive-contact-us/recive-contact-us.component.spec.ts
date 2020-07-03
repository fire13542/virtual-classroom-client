import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciveContactUsComponent } from './recive-contact-us.component';

describe('ReciveContactUsComponent', () => {
  let component: ReciveContactUsComponent;
  let fixture: ComponentFixture<ReciveContactUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReciveContactUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReciveContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
