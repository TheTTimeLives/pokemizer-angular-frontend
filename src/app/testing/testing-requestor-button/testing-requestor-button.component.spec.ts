import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingRequestorButtonComponent } from './testing-requestor-button.component';

describe('TestingRequestorButtonComponent', () => {
  let component: TestingRequestorButtonComponent;
  let fixture: ComponentFixture<TestingRequestorButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestingRequestorButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestingRequestorButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
