import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contador-inicial',
  templateUrl: './contador-inicial.component.html',
  styleUrls: ['./contador-inicial.component.css']
})
export class ContadorInicialComponent implements OnInit, OnDestroy{
  contador = 3;
  interval : any;

  constructor(private _router: Router){}

  ngOnInit(): void {
    this.playContador()
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  playContador(){
    this.interval = setInterval(()=>{
      if(this.contador > 0 ){
        this.contador = this.contador - 1;
      }else{
        if(this.contador == 0){
          this._router.navigate(['/jugar/Quizz'])
        }
      }
    },1000);
  }
}
