import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RespuestaQuizzService } from 'src/app/services/respuesta-quizz.service';

@Component({
  selector: 'app-ingresar-nombre',
  templateUrl: './ingresar-nombre.component.html',
  styleUrls: ['./ingresar-nombre.component.css']
})
export class IngresarNombreComponent implements OnInit{
  nombre = '';
  errorText = '';
  error = false;

  constructor(private _respuestSer: RespuestaQuizzService, private _router: Router){}

  ngOnInit(): void {
    this.validarRefresh();
  }

  ingresarNombre(){
    if(this.nombre === ''){
      this.errorMensaje('Ingrese un Nombre');
    }else{
      //Guardamos el nombre en el servicio para luego utilizarlo en otro componente
      this._respuestSer.nombreParticipante = this.nombre;
      //Redireccionamos al nuevo componente al usuario
      this._router.navigate(['/jugar/iniciar']);
    }
  }

  validarRefresh(){
    if(this._respuestSer.cuestionario === undefined){
      this._router.navigate(['/']);
    }
  }

  //Metodo de manejo mensaje de errores
  errorMensaje(text: string){
    this.errorText = text;
    this.error = true;
    //Mostramos el error por 4 segundos
    setTimeout(()=>{
      this.error=false;
    },2500)
  }

}
