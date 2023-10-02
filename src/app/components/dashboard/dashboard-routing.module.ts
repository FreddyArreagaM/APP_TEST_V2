import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { ListCuestionariosComponent } from './list-cuestionarios/list-cuestionarios.component';
import { CrearQuizzComponent } from './crear-quizz/crear-quizz.component';
import { CrearPreguntasComponent } from './crear-preguntas/crear-preguntas.component';
import { VerCuestionarioComponent } from './ver-cuestionario/ver-cuestionario.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { RespuestaUsuarioComponent } from '../shared/respuesta-usuario/respuesta-usuario.component';

const routes: Routes = [
  { path: '', component: ListCuestionariosComponent},
  { path: 'crearQuizz', component: CrearQuizzComponent},
  { path: 'crearPreguntas', component: CrearPreguntasComponent},
  { path: 'cuestionario/:id', component: VerCuestionarioComponent},
  { path: 'estadisticas/:id', component: StatisticsComponent},
  { path: 'respuestaUsuarioAdmin/:id', component: RespuestaUsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
