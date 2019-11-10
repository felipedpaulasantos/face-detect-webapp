import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSpinnerDefaultComponent } from './ngx-spinner-default.component';

describe('NgxSpinnerDefaultComponent', () => {
  let component: NgxSpinnerDefaultComponent;
  let fixture: ComponentFixture<NgxSpinnerDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxSpinnerDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSpinnerDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
