import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pregunta } from 'src/app/models/Pregunta';
import { Respuesta } from 'src/app/models/Respuesta';
import { QuizzService } from 'src/app/services/quizz.service';

@Component({
  selector: 'app-crear-preguntas',
  templateUrl: './crear-preguntas.component.html',
  styleUrls: ['./crear-preguntas.component.css']
})
export class CrearPreguntasComponent implements OnInit{
  addPreguntaForm: FormGroup;
  mostrarError = false;

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

  }

  //Metodo get para obtener segundos
  get seg(){
    return this.addPreguntaForm.get('segundos')?.value;
  }

  //Metodo get para obtener puntos
  get puntos(){
    return this.addPreguntaForm.get('puntos')?.value;
  }

  //Metodo para validar como mínimo solo 5 segundos
  validate() {
    if (this.seg > 5) {
      this.calcular(-1);
    }
  }

  //Metodo para aumentar o disminuir los segundos
  calcular(numero: number){
    this.addPreguntaForm.patchValue({
      segundos: this.seg + numero
    })
  }

  //Metodo para agregar en la lista de preguntas 
  agregar(){
    //Validacion del formulario y validación de que alguna respuesta tenga el check 
    if(this.addPreguntaForm.invalid || this.allIncorrectas()){
      this.error();
    }else{
      let listRespuestas: Respuesta[] = [];
      for (let i = 1; i <= 4; i++) {
        const respuestaFormGroup = this.addPreguntaForm.get(`respuesta${i}`);
        if (respuestaFormGroup) {
          const titulo = respuestaFormGroup.get('titulo')?.value;
          const esCorrecta = respuestaFormGroup.get('esCorrecta')?.value;
      
          if(titulo !== ""){
            const respuesta: Respuesta = {
              descripcion: titulo,
              esCorrecta: esCorrecta
            };
            listRespuestas.push(respuesta);
          }
        }
      }
      const tituloPregunta = this.addPreguntaForm.get('titulo')?.value;
      const puntos = this.addPreguntaForm.get('puntos')?.value;
      const segundos = this.addPreguntaForm.get('segundos')?.value;

      const pregunta: Pregunta = {
        titulo : tituloPregunta,
        puntos : puntos,
        segundos: segundos,
        listadoRespuestas: listRespuestas
      }

      //Agregamos la pregunta al metodo para el subject
      this._quizzService.agregarPregunta(pregunta);
      this.reset();
    }

  }

  //Mensaje de error en el formulario
  error(){
    this.mostrarError = true;
    //Se muestra por 3 segundos el error
    setTimeout(()=>{
      this.mostrarError= false;
    }, 3000);
  }

  //Metodo para resetear el formulario
  reset(){
    this.addPreguntaForm.patchValue({
      titulo: '',
      puntos:1000,
      segundos:10,
      respuesta1: {
        titulo: '',
        esCorrecta: false
      },
      respuesta2: {
        titulo: '',
        esCorrecta: false
      },
      respuesta3: {
        titulo: '',
        esCorrecta: false
      },
      respuesta4: {
        titulo: '',
        esCorrecta: false
      }
    })
  }

  //Método para obtener el valor de la respuesta
  esCorrecta(numero: string){
    let stringRta = 'respuesta'
    let nroRespuesta = stringRta.concat(numero)
    this.setFalseRespuesta(nroRespuesta);
    const valor = this.obtenerEstadoRespuesta(nroRespuesta);
    this.addPreguntaForm.get(nroRespuesta)?.patchValue({
      esCorrecta : !valor
    })
  }

  //Metodo para consultar si no fue seleccionada ninguna respuesta como verdadera
  allIncorrectas(){
    const array = ['respuesta1', 'respuesta2', 'respuesta3', 'respuesta4']
    for(let i=0; i< array.length; i++){
      if(this.addPreguntaForm.get(array[i])?.get('esCorrecta')?.value == true){
        return false;
      }
    }
    return true;
  }

  //Metodo para obtener si la respuesta es correcta o no
  obtenerEstadoRespuesta(respuesta: string): boolean{
    return this.addPreguntaForm.get(respuesta)?.get('esCorrecta')?.value;
  }

  //Metodo para setear como falso dinámicamente las respuestas que no fueron seleccionadas
  setFalseRespuesta(numeroRespuesta: String){
    const arrayResp = ['respuesta1', 'respuesta2', 'respuesta3', 'respuesta4']
    //Recorremos el array y seteamos todas las respuestas como False, exepto la seleccionada
    for(let i =0; i < arrayResp.length; i++){
      if(arrayResp[i] != numeroRespuesta){
        this.addPreguntaForm.get(arrayResp[i])?.patchValue({
          esCorrecta : false
        });
      }
    }
  }
}
