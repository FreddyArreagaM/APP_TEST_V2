import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  //Errores comunes en el registro
    // auth/email-already-in-use
    // auth/invalid-email
    // auth/weak-password

  //Errores comunes en el login
    // auth/wrong-password
    // auth/user-not-found

  error(code: string): any {
    switch(code){
      case 'auth/email-already-in-use':
        //Email ya registrado
        return 'El correo ya está registrado';  
      
      case 'auth/invalid-email':
        //Email es invalido
        return 'El correo es inválido';
      
      case 'auth/weak-password':
        //Password debil
        return 'La contraseña es muy débil';
       
      case 'auth/wrong-password':
        //Password incorrecta
        return 'La contraseña es incorrecta';
      
      case 'auth/user-not-found':
        //Usuario no registrado
        return 'El correo no se encuentra registrado';
        
      default:
        return 'Error desconocido';
    }
  }
}
