import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoUniaoRoutingModule } from './tipo-uniao-routing.module';
import { TipoUniaoPesquisaComponent } from './tipo-uniao-pesquisa/tipo-uniao-pesquisa.component';
import { TipoUniaoCadastroComponent } from './tipo-uniao-cadastro/tipo-uniao-cadastro.component';


@NgModule({
  declarations: [TipoUniaoPesquisaComponent, TipoUniaoCadastroComponent],
  imports: [
    CommonModule,
    TipoUniaoRoutingModule
  ]
})
export class TipoUniaoModule { }
