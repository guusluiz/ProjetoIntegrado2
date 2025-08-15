import { Routes } from '@angular/router';
import { CadastrarComponent } from './pages/cadastrar/cadastrar.component';
import { ConsultarComponent } from './pages/consultar/consultar.component';
import { HomeComponent } from './pages/home/home.component';
import { EditarComponent } from './pages/editar/editar.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'cadastrar', component: CadastrarComponent},
    {path: 'consultar', component:ConsultarComponent},
     { path: 'editar/:id', component: EditarComponent },
    { path: '**', redirectTo: 'home' }
];
