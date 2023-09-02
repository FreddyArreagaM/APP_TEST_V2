import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: InicioComponent},
  { 
    // LazyLoading angular permite una carga rápida al parametrizar el ruteo solamente entre modulos
    // así no es necesario cargar todos los componentes de la app, si no que solo va cargando
    // en base a la navegación que va haciendo el usuario
    path: 'usuario',  
    loadChildren: () => import('./components/usuario/usuario.module').then(m => m.UsuarioModule)
  },
  { 
    // LazyLoading angular permite una carga rápida al parametrizar el ruteo solamente entre modulos
    // así no es necesario cargar todos los componentes de la app, si no que solo va cargando
    // en base a la navegación que va haciendo el usuario
    path: 'dashboard', component: DashboardComponent,  
    loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  { path: '**', redirectTo:'/', pathMatch:'full' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
