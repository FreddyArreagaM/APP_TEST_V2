import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Pregunta } from '../models/Pregunta';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Cuestionario } from '../models/Cuestionario';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {
  tituloQuizz: string = '';
  descripcion: string = '';
  private pregunta$ = new Subject<Pregunta>();
  
  constructor(private _firestore: AngularFirestore) { 

  }

  //Metodo para agregar datos del componente 1
  agregarPregunta(pregunta: Pregunta){
    this.pregunta$.next(pregunta);
  }

  //Metodo para obtener los datos desde componente 2
  getPreguntas(): Observable<Pregunta>{
    return this.pregunta$.asObservable()
  }

  //Metodo para agregar los cuestionarios en firestore
  addCuestionario(cuestionario: Cuestionario): Promise<any>{
    return this._firestore.collection('cuestionarios').add(cuestionario);
  }

  //Metodo para obtener los cuestionarios by uid del usuario logeado
  getCuestionarioByUser(uid: string): Observable <any>{
    return this._firestore.collection('cuestionarios', ref => ref.where('uid', '==', uid)).snapshotChanges(); 
    //snapshotChanges es una funcion que permite obtener un array de datos sincronizados
    //es decir en tiempo real y se actualizan sin tener que refrescar la pagina
  }

  //Metodo para eliminar un documento de la coleccion
  deleteCuestionarioById(id: string): Promise <any>{
    return this._firestore.collection('cuestionarios').doc(id).delete();
  }

  //Metodo para obtener un cuestionario de la coleccion by id 
  getCuestionarioById(id: string): Observable <any>{
    return this._firestore.collection('cuestionarios').doc(id).get();
  }
}
