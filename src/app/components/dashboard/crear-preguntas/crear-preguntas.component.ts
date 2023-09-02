import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuizzService } from 'src/app/services/quizz.service';

@Component({
  selector: 'app-crear-preguntas',
  templateUrl: './crear-preguntas.component.html',
  styleUrls: ['./crear-preguntas.component.css']
})
export class CrearPreguntasComponent implements OnInit{
  addPreguntaForm: FormGroup;

  constructor(private fb: FormBuilder, private _quizzService: QuizzService){
    this.addPreguntaForm = this.fb.group({
      titulo: ['', Validators.required],
      segundos: [10, Validators.required],
      puntos: [1000, Validators.required],

      respuesta1: this.fb.group({
        titulo: ['', Validators.required],
        esCorrecta: [false, Validators.required]
      }),
      respuesta2: this.fb.group({
        titulo: ['', Validators.required],
        esCorrecta: [false, Validators.required]
      }),
      respuesta3: this.fb.group({
        titulo: '',
        esCorrecta: false
      }),
      respuesta4: this.fb.group({
        titulo: '',
        esCorrecta: false
      }),
    })
  }

  ngOnInit(): void{
    console.log('Titulo:' ,this._quizzService.tituloQuizz);
    console.log('Descripcion:', this._quizzService.descripcion);
  }

  get seg(){
    return this.addPreguntaForm.get('segundos')?.value;
  }

  get puntos(){
    return this.addPreguntaForm.get('puntos')?.value;
  }

  validate() {
    if (this.seg > 5) {
      this.calcular(-1);
    }
  }
  calcular(numero: number){
    this.addPreguntaForm.patchValue({
      segundos: this.seg + numero
    })
  }

  agregar(){
    console.log(this.addPreguntaForm);
  }

  esCorrecta(numero: string){
    let stringRta = 'respuesta'
    let nroRespuesta = stringRta.concat(numero)
    const valor = this.obtenerEstadoRespuesta(nroRespuesta);
    this.addPreguntaForm.get(nroRespuesta)?.patchValue({
      esCorrecta : !valor
    })
  }

  obtenerEstadoRespuesta(respuesta: string): boolean{
    return this.addPreguntaForm.get(respuesta)?.get('esCorrecta')?.value;
  }
}
