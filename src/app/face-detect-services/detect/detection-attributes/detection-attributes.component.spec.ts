import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetectionAttributesComponent } from './detection-attributes.component';

describe('DetectionAttributesComponent', () => {
  let component: DetectionAttributesComponent;
  let fixture: ComponentFixture<DetectionAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetectionAttributesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetectionAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
