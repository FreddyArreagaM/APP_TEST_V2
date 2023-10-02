import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuizzService } from 'src/app/services/quizz.service';

@Component({
  selector: 'app-crear-quizz',
  templateUrl: './crear-quizz.component.html',
  styleUrls: ['./crear-quizz.component.css']
})
export class CrearQuizzComponent implements OnInit{
  cuestionarioForm: FormGroup;
  mostrarError = false;
  
  ngOnInit(): void {}

  constructor(private fb: FormBuilder, private _router: Router, private _quizzService: QuizzService){
    this.cuestionarioForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion : ['', Validators.required]
    })
  }

  //Metodo para ir al siguiente componente
  next(){
    //Validamos si el formulario se encuentra invalido
    if(this.cuestionarioForm.invalid){ 
      this.mostrarError = true;
      setTimeout(()=>{
        this.mostrarError = false;
      },3000)
    }else{

      //Formulario es valido entonces
      this._quizzService.tituloQuizz = this.cuestionarioForm.get('titulo')?.value;
      this._quizzService.descripcion = this.cuestionarioForm.get('descripcion')?.value;

      this._router.navigate(['/dashboard/crearPreguntas'])
    }
  }
}
