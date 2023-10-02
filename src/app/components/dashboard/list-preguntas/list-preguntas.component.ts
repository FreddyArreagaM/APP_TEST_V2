import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cuestionario } from 'src/app/models/Cuestionario';
import { Pregunta } from 'src/app/models/Pregunta';
import { QuizzService } from 'src/app/services/quizz.service';
import { nanoid } from 'nanoid'
import { user } from 'src/app/interfaces/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-preguntas',
  templateUrl: './list-preguntas.component.html',
  styleUrls: ['./list-preguntas.component.css']
})
export class ListPreguntasComponent implements OnInit{
  listPreguntas: Pregunta[] = [];
  tituloCuestionario: string;
  descripcionCuestionario: string;
  loading = false;

  constructor(private _quizzService: QuizzService, private router: Router, private _toastr: ToastrService){
    this._quizzService.getPreguntas().subscribe(data=>{
      this.listPreguntas.push(data);
    })
    this.tituloCuestionario = this._quizzService.tituloQuizz;
    this.descripcionCuestionario = this._quizzService.descripcion;
  }

  ngOnInit(): void {
    if(this.tituloCuestionario == '' || this.descripcionCuestionario == ''){
      this.router.navigate(['/dashboard'])
    }
  }
  //Metodo para eliminar pregunta del array
  eliminarPregunta(index: number){
    this.listPreguntas.splice(index,1);
  }

  //Metodo para finalizar la creación del quizz y agregarlo a firebase
  finalizar(){
    const codigo = this.generarCodigo();

    //Obtenemos el uid del usuario logeado al quizz
    const usuario: user = JSON.parse(localStorage.getItem('user')!);
    
    const cuestionario : Cuestionario ={
      uid :usuario.uid,
      titulo: this.tituloCuestionario,
      descripcion: this.descripcionCuestionario,
      codigo: codigo,
      cantidadPreguntas : this.listPreguntas.length,
      fechaCreacion: new Date(),
      listaPreguntas: this.listPreguntas
    }
    this.loading = true;
    this._quizzService.addCuestionario(cuestionario).then(data=>{
      this._toastr.success('Registro exitoso!', 'Cuestionario Registrado');
      this.router.navigate(['/dashboard']);
    }).catch(error =>{
      this.loading= false;
      console.log(error)
    })

  }

  //Metodo para generar un codigo random
  generarCodigo(): string{
    return nanoid(6).toUpperCase();
  }

}
