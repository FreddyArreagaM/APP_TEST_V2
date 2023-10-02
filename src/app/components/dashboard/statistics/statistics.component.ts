import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { RespuestaQuizzService } from 'src/app/services/respuesta-quizz.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit, OnDestroy{
  id!: string;
  loading = false;
  listRespuestasUsuario: any[] = [];
  respuestaQuizz: Subscription = new Subscription();

  constructor(private _respuestaService: RespuestaQuizzService, private aRoute: ActivatedRoute, private _toastr: ToastrService){
    this.id = this.aRoute.snapshot.paramMap.get('id')!;
    console.log(this.id);
  }

  ngOnInit(): void {
    this.getRespuesta();
  }

  ngOnDestroy(): void {
    this.respuestaQuizz.unsubscribe();
  }

  //Metodo para obtener los datos de respuesta por cuestionario
  getRespuesta(){
    this.loading = true
    this.respuestaQuizz = this._respuestaService.getRespuestaByIdCuestionario(this.id).subscribe(doc =>{
      this.loading = false;
      this.listRespuestasUsuario = [];
      doc.forEach((element:any) => {
        this.listRespuestasUsuario.push({
          id:element.payload.doc.id,
          ...element.payload.doc.data()
        })    
      });

      console.log(this.listRespuestasUsuario);
    }, error =>{
      console.log(error);
    })
  }

  eliminarRespuestaUser(id: string){
    this.loading = true;
    this._respuestaService.deleteRespuestaByIdUser(this.id).then(()=>{
      this.loading = false;
      this._toastr.info('La respuesta fue eliminada', 'Respuesta Eliminada');
    }, error =>{
      this.loading = false;
      console.log(error);
      this._toastr.error('Ops.. ocurrió un error', 'Error!');
    })
  }
}

