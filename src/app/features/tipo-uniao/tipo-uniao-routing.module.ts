import { TipoUniaoPesquisaComponent } from './tipo-uniao-pesquisa/tipo-uniao-pesquisa.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { TipoUniaoCadastroComponent } from './tipo-uniao-cadastro/tipo-uniao-cadastro.component';

const routes: Routes = [
    {
        path: '',
        component: TipoUniaoPesquisaComponent,
        canActivate: [AuthGuard],
        data: { perfis: ['ADMIN'] }
    },
    {
        path: 'nova',
        component: TipoUniaoCadastroComponent,
        canActivate: [AuthGuard],
        data: { perfis: ['ADMIN'] }
    },
    {
        path: ':id',
        component: TipoUniaoCadastroComponent,
        canActivate: [AuthGuard],
        data: { perfis: ['ADMIN'] }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TipoUniaoRoutingModule { }
