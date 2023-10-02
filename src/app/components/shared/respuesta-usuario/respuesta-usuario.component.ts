import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RespuestaQuizzService } from 'src/app/services/respuesta-quizz.service';

@Component({
  selector: 'app-respuesta-usuario',
  templateUrl: './respuesta-usuario.component.html',
  styleUrls: ['./respuesta-usuario.component.css']
})
export class RespuestaUsuarioComponent implements OnInit{
  id!: string;
  loading= false;
  rutaAnterior = '';

  //cuestionario
  respuestaCuestionario: any;

  constructor(private _respuestService: RespuestaQuizzService, private aRoute: ActivatedRoute, private _router: Router ){
    this.id = this.aRoute.snapshot.paramMap.get('id')!; //Mediante esta linea de codigo obtenemos el valor del id que enviamos desde otro componente
    this.rutaAnterior = this.aRoute.snapshot.url[0].path; //Obtenemos la ruta anterior con esta linea de codigo
  }

  ngOnInit(): void {
    this.getRespuestaUser();
  }

  //Metodo para obtener las respuestas del Usuario
  getRespuestaUser(){
    this.loading = true;
    this._respuestService.getRespuestaUser(this.id).subscribe(doc =>{
      if(!doc.exists){
        this._router.navigate(['/']);
      }else{
        this.respuestaCuestionario = doc.data();
        this.loading = false;
      }

    })
  }

  //Metodo para regresar al inicio
  volver(){
    if(this.rutaAnterior == 'respuestaUsuarioAdmin'){
      this._router.navigate(['/dashboard/estadisticas', this.respuestaCuestionario.idCuestionario]);
    }else{
      this._router.navigate(['/']);
    }
  }

}
