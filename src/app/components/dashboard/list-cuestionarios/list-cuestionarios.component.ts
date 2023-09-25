import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Cuestionario } from 'src/app/models/Cuestionario';
import { QuizzService } from 'src/app/services/quizz.service';

@Component({
  selector: 'app-list-cuestionarios',
  templateUrl: './list-cuestionarios.component.html',
  styleUrls: ['./list-cuestionarios.component.css']
})
export class ListCuestionariosComponent implements OnInit, OnDestroy{

  //Variable para manejar la subscripciones
  subscriptionUser: Subscription = new Subscription();
  subscriptionQuizz: Subscription = new Subscription();
  listCuestionarios: Cuestionario[] =[];
  loading = false;

  constructor(private afAuth: AngularFireAuth, private router: Router, private _quizz: QuizzService, private _toastr: ToastrService){
  
  }

  //Este metodo se utiliza porque al subscribirse aunque el componente se renderize 
  //Puede que la memoria no se elimine y acumule un dato y lo repita varias veces inclusive un metodo.
  //Por eso es mejor usar unsubcribe para bajar esa orden y no tener bugs
  ngOnDestroy(): void {
    this.subscriptionUser.unsubscribe();
    this.subscriptionQuizz.unsubscribe();
  }

  ngOnInit(): void{
    this.loading = true;
    this.subscriptionUser = this.afAuth.user.subscribe(user =>{
      console.log(user);
      if(user && user.emailVerified){
        //Cargar los cuestionarios
        this.getCuestionario(user.uid);
      }else{
        //Redireccionamos al inicio
        this.router.navigate(['/']);
      }
    })
  }

  getCuestionario(uid: string){
    this.subscriptionQuizz = this._quizz.getCuestionarioByUser(uid).subscribe(data =>{
      this.listCuestionarios = [];
      this.loading = false;
      data.forEach((element: any) => {
        this.listCuestionarios.push({
          id: element.payload.doc.id,
          ... element.payload.doc.data()
        });
        console.log(this.listCuestionarios);
        //console.log(element.payload.doc.id);
        //console.log(element.payload.doc.data());
      });
    }, error => {
      console.log(error);
      this.loading = false;
      this._toastr.error('Opss.. ocurrió un error', 'Error');
    })
  }

  eliminarCuestionario(id: any){
    this.loading = true;
    this._quizz.deleteCuestionarioById(id).then(data =>{
      console.log(data);
      this._toastr.error('El cuestionario fue eliminado con exito!', 'Registro eliminado');
      this.loading = false;
    }, error =>{
      console.log(error);
      this.loading = false;
      this._toastr.error('Opss.. ocurrió un error', 'Error');
    });
  }
}
