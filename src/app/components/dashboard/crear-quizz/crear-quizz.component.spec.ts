import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearQuizzComponent } from './crear-quizz.component';

describe('CrearQuizzComponent', () => {
  let component: CrearQuizzComponent;
  let fixture: ComponentFixture<CrearQuizzComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearQuizzComponent]
    });
    fixture = TestBed.createComponent(CrearQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
