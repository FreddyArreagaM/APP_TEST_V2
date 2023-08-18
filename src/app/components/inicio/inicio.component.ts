import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  error=false;
  pin = '';

  constructor(){}

  agregar(){
    if(this.pin==""){
      this.error=true;
      setTimeout( ()=>{
        this.error=false;
      },3000)

    }
  }

}
