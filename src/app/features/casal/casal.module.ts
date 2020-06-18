import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CasalRoutingModule } from './casal-routing.module';
import { CasalPesquisaComponent } from './casal-pesquisa/casal-pesquisa.component';
import { CasalCadastroComponent } from './casal-cadastro/casal-cadastro.component';


@NgModule({
  declarations: [CasalPesquisaComponent, CasalCadastroComponent],
  imports: [
    CommonModule,
    CasalRoutingModule
  ]
})
export class CasalModule { }
