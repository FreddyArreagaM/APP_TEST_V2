import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCuestionarioComponent } from './ver-cuestionario.component';

describe('VerCuestionarioComponent', () => {
  let component: VerCuestionarioComponent;
  let fixture: ComponentFixture<VerCuestionarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerCuestionarioComponent]
    });
    fixture = TestBed.createComponent(VerCuestionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
