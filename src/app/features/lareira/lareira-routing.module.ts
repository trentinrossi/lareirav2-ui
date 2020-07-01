import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LareiraPesquisaComponent } from './lareira-pesquisa/lareira-pesquisa.component';
import { LareiraCadastroComponent } from './lareira-cadastro/lareira-cadastro.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: LareiraPesquisaComponent,
        canActivate: [AuthGuard],
        data: { perfis: ['ADMIN'] }
    },
    {
        path: 'nova',
        component: LareiraCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN'] }
    },
    {
        path: ':idLareira',
        component: LareiraCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN'] }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LareiraRoutingModule { }
