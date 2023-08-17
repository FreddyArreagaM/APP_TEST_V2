import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nombre = 'Freddy Arreaga';

  constructor(){
    setInterval( () => this.nombre = 'Eren Jaeger', 3000);
  }
}
