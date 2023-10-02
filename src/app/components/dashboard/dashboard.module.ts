import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListCuestionariosComponent } from './list-cuestionarios/list-cuestionarios.component';
import { CrearQuizzComponent } from './crear-quizz/crear-quizz.component';
import { CrearPreguntasComponent } from './crear-preguntas/crear-preguntas.component';
import { ListPreguntasComponent } from './list-preguntas/list-preguntas.component';
import { VerCuestionarioComponent } from './ver-cuestionario/ver-cuestionario.component';
import { StatisticsComponent } from './statistics/statistics.component';


@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    ListCuestionariosComponent,
    CrearQuizzComponent,
    CrearPreguntasComponent,
    ListPreguntasComponent,
    VerCuestionarioComponent,
    StatisticsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
