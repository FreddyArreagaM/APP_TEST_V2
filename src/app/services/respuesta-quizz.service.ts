import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Cuestionario } from '../models/Cuestionario';

@Injectable({
  providedIn: 'root'
})
export class RespuestaQuizzService {
  cuestionario!: Cuestionario;
  nombreParticipante = '';

  constructor(private _firestore: AngularFirestore) { }

  //Metodo para obtener cuestionario por codigo
  searchByCode(code: string): Observable <any>{
    return this._firestore.collection('cuestionarios', ref => ref.where('codigo', '==', code)).get();
  }

  //Metodo para guardar la respuesta de un Usuario en la coleccion
  setRespuestaUsuario(respuestaUsuario: any): Promise <any>{
    return this._firestore.collection('respuestas').add(respuestaUsuario);  
  }

  //Metodo para obtener las respuestas de un Usuario
  getRespuestaUser(id: string): Observable <any>{
    return this._firestore.collection('respuestas').doc(id).get();
  }

  //Metodo para obtener las respuestas a un cuestionario by ID
  getRespuestaByIdCuestionario(id: string): Observable <any>{
    return this._firestore.collection('respuestas', ref => ref.where('idCuestionario', '==', id)).snapshotChanges();
  }

  //Metodo para eliminar la respuesta de un usuario by ID
  deleteRespuestaByIdUser(id: string): Promise <any>{
    return this._firestore.collection('respuestas').doc(id).delete();
  }
}
