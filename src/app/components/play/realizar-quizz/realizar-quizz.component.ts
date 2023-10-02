import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cuestionario } from 'src/app/models/Cuestionario';
import { RespuestaQuizzService } from 'src/app/services/respuesta-quizz.service';

@Component({
  selector: 'app-realizar-quizz',
  templateUrl: './realizar-quizz.component.html',
  styleUrls: ['./realizar-quizz.component.css']
})
export class RealizarQuizzComponent implements OnInit, OnDestroy{
  //Cuestionario 
  cuestionario!: Cuestionario;
  nombreParticipante = ''; 
  indexPregunta = 0;
  segundos = 0;
  interval: any;
  loading = false;
  
  //Respuesta usuario
  opcionSeleccionada: any;
  indexSeleccionado: any;
  cantidadCorrectas = 0;
  cantidadIncorrectas = 0;
  puntosTotales = 0;
  listRespuestaUsuario: any[] = []; 

  constructor(private _respuestaQuizz: RespuestaQuizzService, private _router: Router){

  }

  ngOnInit(): void {
    this.cuestionario= this._respuestaQuizz.cuestionario;
    this.nombreParticipante= this._respuestaQuizz.nombreParticipante;
    this.validateRefresh();
    this.startCount();
  }

  //Metodo para eliminar el intervalo cuando el componente se destruye
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
  
  //Validamos que el usuario no haya hehco refresh o aplastado F5 y se haya eliminado el valor de cuestionario
  validateRefresh(){
    if(this.cuestionario === undefined){
      this._router.navigate(['/']);        
    }
  }

  //Metodo para obtener los segundos según la pregunta
  getSegundos(): number{
    return this.segundos;
  }

  //Metodo para obtener el titulo de la pregunta
  getTitulo(): string{
    return this.cuestionario.listaPreguntas[this.indexPregunta].titulo;
  }

  //Metodo para iniciar conteo segundos
  startCount(){
    this.segundos = this.cuestionario.listaPreguntas[this.indexPregunta].segundos;

    this.interval = setInterval(()=>{
      
      if(this.segundos === 0){
        /*this.indexPregunta++;
        //Metodo para limpiar el Intervalo es necesario para manejar todo tipo de intervalos a nivel general
        clearInterval(this.interval);
        this.startCount();*/
        this.addRespuesta();
      }else{
        this.segundos--;
      }
    },1000);
  }

  //Metodo para obtener la respuesta seleccionada
  respuestaSeleccionada(respuesta: any, index: any){
    this.opcionSeleccionada = respuesta;
    this.indexSeleccionado = index;
  }

  //Metodo para confirmar y setear la class a la respuesta seleccionada
  selection(respuesta: any): string{
    if(respuesta === this.opcionSeleccionada){
      return 'classSeleccionada';
    } else{
      return '';
    }
  }

  //Metodo para avanzar entre preguntas
  siguiente(){
    clearInterval(this.interval);
    this.addRespuesta();
    this.startCount();
  }

  //Metodo para aumentar el index para avanzar a la siguiente
  addRespuesta(){

    //Incrementamos contadores respuestas ( correctas e incorrectas)
    this.getCounts();


    //Creamos objeto respuesta y obtenemos los valores correspondientes
    const respuestaUsuario = {
      titulo: this.cuestionario.listaPreguntas[this.indexPregunta].titulo, //Obtenemos el valor del titulo de la pregunta
      puntosObtenidos: this.getPuntosPregunta(), //Vamos a obtener el valor de los puntos que obtuvo el usuario según la pregunta
      segundos: this.getSegundosRespuesta(), //Obtenemos la cantidad de segundos que demoró el usuario en contestar la pregunta
      indexRespuestaSeleccionada: this.getIndexRespuesta(), //Obtenemos el indice de la respuesta que el usuario seleccionó
      listRespuesta: this.cuestionario.listaPreguntas[this.indexPregunta].listadoRespuestas,
    }
    
    //Almacenamos el objeto en el array 
    this.listRespuestaUsuario.push(respuestaUsuario);

    //Reiniciamos los valores de las variables
    this.opcionSeleccionada=undefined;
    this.indexSeleccionado=undefined;

    //Validamos si es la ultima pregunta
    if(this.cuestionario.listaPreguntas.length - 1 === this.indexPregunta){

      //guardamos las respuestas en firebase
      this.savedCuestionario();

    }else{
      this.indexPregunta++;
      this.segundos = this.cuestionario.listaPreguntas[this.indexPregunta].segundos;
    }
  }

  //Metodo para obtener los puntos respectivos según las condicionales
  getPuntosPregunta(): number{
    //Si el usuario no seleccionó ninguna pregunta
    if(this.opcionSeleccionada === undefined){
      return 0;
    }else{
      //Validamos si la pregunta es correcta
      if(this.opcionSeleccionada.esCorrecta == true){
        //Incrementamos la variable puntosTotales
        const puntos = this.cuestionario.listaPreguntas[this.indexPregunta].puntos
        this.puntosTotales = this.puntosTotales + puntos;
        
        return puntos;
      }else{
        //Caso contrario la respuesta es incorrecta el valor se retorna 0
        return 0;
      }
    }
  }

  //Metodo para obtener los segundos en que el usuario demora en responder
  getSegundosRespuesta(): any{
    //Validamos si el usuario respondió la pregunta
    if(this.opcionSeleccionada === undefined){
      return 'No respondió';
    }else{
      const segundosPregunta= this.cuestionario.listaPreguntas[this.indexPregunta].segundos; //Valor establecido de los segundos por pregunta
      const segundosRespuesta = segundosPregunta - this.segundos; //Restamos los segundos totales - los segundos en que se respondió la pregunta
      return segundosRespuesta;
    }
  }

  getIndexRespuesta(): any{
    //Validamos si el usuario seleccionó una respuesta
    if(this.opcionSeleccionada === undefined){
      return '';
    }else{
      return this.indexSeleccionado;
    }
  }

  //Metodo para contar cantidad de preguntas correctas e incorrectas
  getCounts(){
    //Validamos si el usuario seleccionó una respuesta
    if(this.opcionSeleccionada === undefined){
      this.cantidadIncorrectas++;
    }else{
      //Validamos si el usuario respondió correctamente
      if(this.opcionSeleccionada.esCorrecta == true){
        this.cantidadCorrectas++;
      }else{
        this.cantidadIncorrectas++;
      }
    }
  }

  //Metodo para guardar cuestionario en firebase
  savedCuestionario(){
    const respuestaCuestionario: any ={
      idCuestionario: this.cuestionario.id,
      nombreParticipante: this.nombreParticipante,
      fecha: new Date(),
      cantidadPreguntas: this.cuestionario.cantidadPreguntas,
      cantidadCorrectas: this.cantidadCorrectas,
      cantidadIncorrectas: this.cantidadIncorrectas,
      puntosTotales: this.puntosTotales,
      listRespuestaUsuario: this.listRespuestaUsuario
    }

    this.loading = true;
    //Almacenamos la respuesta en firebase
    this._respuestaQuizz.setRespuestaUsuario(respuestaCuestionario).then(data=>{
      console.log(data);

      //redireccionamos al proximo componente
      this._router.navigate(['/jugar/respuestas', data.id]);
    }, error =>{
      console.log(error);

      //redireccionamos al componente inicial 
      this._router.navigate(['/']);
    })
  }
}
