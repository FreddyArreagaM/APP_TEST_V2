import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespuestaUsuarioComponent } from './respuesta-usuario.component';

describe('RespuestaUsuarioComponent', () => {
  let component: RespuestaUsuarioComponent;
  let fixture: ComponentFixture<RespuestaUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RespuestaUsuarioComponent]
    });
    fixture = TestBed.createComponent(RespuestaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
