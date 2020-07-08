import { CasalCadastroComponent } from './casal-cadastro/casal-cadastro.component';
import { CasalPesquisaComponent } from './casal-pesquisa/casal-pesquisa.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: CasalPesquisaComponent,
        canActivate: [AuthGuard],
        data: { perfis: ['ADMIN', 'CLIENTE'] }
    },
    {
        path: 'novo',
        component: CasalCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN', 'CLIENTE'] }
    },
    {
        path: ':idCasal',
        component: CasalCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN', 'CLIENTE'] }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CasalRoutingModule { }
