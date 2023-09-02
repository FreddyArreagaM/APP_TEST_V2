import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPreguntasComponent } from './list-preguntas.component';

describe('ListPreguntasComponent', () => {
  let component: ListPreguntasComponent;
  let fixture: ComponentFixture<ListPreguntasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPreguntasComponent]
    });
    fixture = TestBed.createComponent(ListPreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
