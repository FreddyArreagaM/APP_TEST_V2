import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cuestionario } from 'src/app/models/Cuestionario';
import { RespuestaQuizzService } from 'src/app/services/respuesta-quizz.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit, OnDestroy{
  cuestionarioSubcription: Subscription = new Subscription();
  error=false;
  pin = '';
  errorText= '';
  loading= false;

  constructor(private _respuestaSer: RespuestaQuizzService, private _router: Router){}

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.cuestionarioSubcription.unsubscribe();
  }

  //Metodo para ingreso al cuestionario por medio del PIN
  agregar(){
    if(this.pin==""){
      this.errorMensaje('Por favor ingrese un PIN');
    }else{
      this.loading=true;
      this.cuestionarioSubcription = this._respuestaSer.searchByCode(this.pin).subscribe(data =>{
        this.loading=false;
        if(data.empty){
          this.errorMensaje('PIN inválido');
        }else{
          //Extraemos los datos apartir del codigo del cuestionario
          data.forEach((element: any) => {
            const cuestionario: Cuestionario={
              id: element.id,
              ...element.data()
            }
            console.log(cuestionario);
            //Almacenamos los datos del cuestionario dentro de una variable cuestionario en el servicio para acceder a el luego 
            //por medio de otro componente.
            this._respuestaSer.cuestionario = cuestionario;

            //Redireccionamos al proximo componente
            this._router.navigate(['/jugar'])

          });
        }
      }, error =>{
        console.log(error);
        this.loading=false;
      })
    }
  }

  //Metodo de manejo mensaje de errores
  errorMensaje(text: string){
    this.errorText = text;
    this.error = true;
    this.pin = '';

    //Mostramos el error por 4 segundos
    setTimeout(()=>{
      this.error=false;
    },2500)
  }

}
