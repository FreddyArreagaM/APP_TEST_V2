import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { IngresarNombreComponent } from './ingresar-nombre/ingresar-nombre.component';
import { ContadorInicialComponent } from './contador-inicial/contador-inicial.component';
import { RealizarQuizzComponent } from './realizar-quizz/realizar-quizz.component';
import { RespuestaUsuarioComponent } from '../shared/respuesta-usuario/respuesta-usuario.component';

const routes: Routes = [
  { path: '', component: IngresarNombreComponent},
  { path: 'iniciar', component: ContadorInicialComponent},
  { path: 'Quizz', component: RealizarQuizzComponent},
  { path: 'respuestas/:id', component: RespuestaUsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayRoutingModule { }
