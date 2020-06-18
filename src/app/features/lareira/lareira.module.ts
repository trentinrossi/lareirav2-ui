import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LareiraRoutingModule } from './lareira-routing.module';
import { LareiraPesquisaComponent } from './lareira-pesquisa/lareira-pesquisa.component';
import { LareiraCadastroComponent } from './lareira-cadastro/lareira-cadastro.component';

@NgModule({
    declarations: [LareiraPesquisaComponent, LareiraCadastroComponent],
    imports: [
        CommonModule,
        LareiraRoutingModule
    ]
})
export class LareiraModule { }
