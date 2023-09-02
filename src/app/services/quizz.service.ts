import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {
  tituloQuizz: string = '';
  descripcion: string = '';

  constructor() { 

  }
}
